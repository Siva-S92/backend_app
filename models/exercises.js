import { ObjectId } from "bson";
import mongoose from "mongoose";


const exerciseSchema = new mongoose.Schema({
    workout: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    user: {
        type: ObjectId,
        ref: "user",
    }
})
const Exercise = mongoose.model("exercise", exerciseSchema);
export { Exercise };