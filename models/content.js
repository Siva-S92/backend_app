import { ObjectId } from "bson";
import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    file: {
        type:String,
    },
    description: {
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

const Content = mongoose.model("content", contentSchema);
export { Content };