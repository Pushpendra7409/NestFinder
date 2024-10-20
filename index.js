import express from 'express';
import dotenv from 'dotenv'
const app = express();
import mongoose from 'mongoose';
dotenv.config()

const connect = async () => {
try{
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
} catch (error){
    throw error
}
};

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
})
mongoose.connection.on("connected", () => {
    console.log("MongoDB connection connected");
})


app.listen(8080, () => {
    connect();
    console.log('Server is running on port 8080');
})