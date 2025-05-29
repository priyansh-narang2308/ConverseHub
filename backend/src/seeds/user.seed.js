import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users
    {
        email: "priya.sharma@example.com",
        fullName: "Priya Sharma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        email: "ananya.verma@example.com",
        fullName: "Ananya Verma",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        email: "isha.rani@example.com",
        fullName: "Isha Rani",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        email: "neha.patel@example.com",
        fullName: "Neha Patel",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        email: "sanya.mehra@example.com",
        fullName: "Sanya Mehra",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        email: "riya.kapoor@example.com",
        fullName: "Riya Kapoor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        email: "aarti.jain@example.com",
        fullName: "Aarti Jain",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        email: "kriti.das@example.com",
        fullName: "Kriti Das",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },

    // Male Users
    {
        email: "rahul.singh@example.com",
        fullName: "Rahul Singh",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        email: "arjun.kumar@example.com",
        fullName: "Arjun Kumar",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        email: "rohit.yadav@example.com",
        fullName: "Rohit Yadav",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        email: "aman.dubey@example.com",
        fullName: "Aman Dubey",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        email: "vivek.joshi@example.com",
        fullName: "Vivek Joshi",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        email: "sachin.nair@example.com",
        fullName: "Sachin Nair",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        email: "deepak.rao@example.com",
        fullName: "Deepak Rao",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

seedDatabase();
