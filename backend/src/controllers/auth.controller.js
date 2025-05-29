import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

// signup 
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password should be greater than 6 characters"
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                message: "User registered successfully!"
            });
        } else {
            res.status(400).json({
                message: "Invalid user data"
            });
        }

    } catch (error) {
        console.log("Error in signup controller: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            message: "User Logged In Successfully!"
        });

    } catch (error) {
        console.log("Error in login controller: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// logout
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "User Logged out Successfully"
        });
    } catch (error) {
        console.log("Error in logout controller: ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

// update profile
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id; //NOTE: lto check which user is this 

        if (!profilePic) {
            return res.status(400).json({
                message: "Profile Pic is required"
            });
        }

        const uploadPhoto = await cloudinary.uploader.upload(profilePic);
        const updtedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePic: uploadPhoto.secure_url
            },
            {
                new: true  //gives the latest object
            }
        );

        res.status(200).json(updtedUser);

    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// to check the user authentication
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};