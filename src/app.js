const express = require("express");
const { userAuth } = require("./middleware/userAuth");
const { connectDB } = require("./config/database");
const User = require("./models/userModel");
const app = express();

app.post("/signup", async (req, res) => {
    try {
        const userData = new User({
            firstName: "sumit",
            lastName: "kumar",
            emailId: "sumit@example.com",
            password: "password123",
            age: 25,
            // gender: "Male"
        })
        await userData.save();
        res.status(200).send("User signed up successfully")
    } catch (error) {
        console.error("Error signing up user:", error)
        res.status(500).send("Error signing up user")
    }
})



const startServer = async () => {
    try {
        await connectDB();

        console.log("Database connected successfully");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Server not started because MongoDB connection failed");
        process.exit(1);
    }
};

startServer();
