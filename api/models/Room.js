import mongoose from 'mongoose';
const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers:[{number: Number, unavailableDates: { type: [Date] }}],

}, { timestamps: true }
);

// [
//     {number:101, unavailableDates: [01.10.2024 ,03.10.2024 ]}
// ]

export default mongoose.model('Room', RoomSchema);