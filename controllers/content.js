import { Content } from "../models/content.js";

export function getAllContent() {
    return Content.find().populate("user", "username");
}

export function getUserContent(req){
    return Content
    .find({user: req.user._id})
    .populate("user", "username email ")
}

export function postNewContent(req){
    const updatedDate = new Date().toJSON().slice(0,10);
    const title = req.body.title;
    const file = req.file.filename;
    const description = req.body.description;
    return Content.create({
        title,
        file,
        description,
        date: updatedDate,
        user: req.user._id
    });
}

export function updatedContent(req) {
    const title = req.body.title;
    const file = req.file.filename;
    const description = req.body.description;
    return Content.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {title, file, description}},
        {new: true}
    );
}

export function deletedContent(req){
    return Content.findByIdAndDelete({
        _id: req.params.id,
    });
}



