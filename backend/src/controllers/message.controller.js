import User from "../models/user.model.js";
import Message from '../models/message.model.js';
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const currentLoggedinUser = req.user._id;
        // i should not be in the sidebar as i am logged in user ok thats why filtering users
        const filterUsers = await User.find(
            {
                _id: {
                    $ne: currentLoggedinUser
                }
            }
        ).select("-password");  //dont send the password

        res.status(200).json(filterUsers);

    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            //NOTE: ya to vo ya to main isliye or use kiya 
            $or: [
                { senderId: myId, receiverId: userToChatId },  //ek bar main bhejunga message 
                { senderId: userToChatId, receiverId: myId } //ek bar user bhejega message 
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            //upload base64 image to cloudinary
            const uploadPhtoot = await cloudinary.uploader.upload(image);
            imageUrl = uploadPhtoot.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //NOTE: SOCKET IO FUNCTIONLAITY
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);


    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};