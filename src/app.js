const express = require("express");
const { userAuth } = require("./middleware/userAuth");
const { connectDB } = require("./config/database");
const User = require("./models/userModel");
const cookieParser=require("cookie-parser");
const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile");
const connectionRoutes = require("./routes/connection");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",connectionRoutes);


app.get("/user", async(req, res)=>{
    let mailId=req.body.emailId
    try{
        let user=await User.find({emailId:mailId}) // find({}) - to get all data
        if(user?.length===0){
            res.status(401).send("User Not Found.")
        }else{

            res.status(200).send(user);
        }
    }catch(err){
        res.status(400).send("something went wrong.")
    }
})

app.delete("/deleteUser",async(req, res)=>{
   try{
     let userId=req.body.userId;
     //await User.findByIdAndDelete({_id:userId})
     await User.findByIdAndDelete(userId)
     res.status(200).send("User Deleted")
   }catch(err){
    res.status(400).send("Something went wrong.")
   }
})

app.patch("/updateUser/:userId", async(req, res)=>{
    try{
        let userId=req.params.userId;
        let data=req.body;
        const ALLOWED_UPDATES=["firstName", "lastName", "password", "photoUrl", "about"];
        const is_Upadte_Allowed=Object.keys(data).every((ele)=> ALLOWED_UPDATES.includes(ele));
        if(!is_Upadte_Allowed){
            throw new Error("Update not Allowed");
        }
        await User.findByIdAndUpdate({_id:userId},data);
        res.status(200).send("Data update Successfully")
    }catch(err){
        res.status(400).send("something went wrong."+err.message)
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
