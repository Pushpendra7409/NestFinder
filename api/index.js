import express from 'express';
import dotenv from 'dotenv'
const app = express();
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from 'cookie-parser';

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

//Middleware routes
app.use (cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
   return res.status(500).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
   })
})

app.listen(8080, () => {
    connect();
    console.log('Server is running on port 8080');
})