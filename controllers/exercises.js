import { Exercise } from "../models/exercises.js";



export function getUserExercise(req){
    return Exercise
    .find({user: req.user._id})
    .populate("user", "username email ")
}

export function postNewExercice(req){
    // const updatedDate = new Date().toJSON().slice(0,10);
    const workout = req.body.workout;
    const duration = req.body.duration;
    const date = req.body.date;
    return Exercise.create({
        workout,
        duration,
        date,
        user: req.user._id
    });
}


export function updatedExercise(req) {
    const workout = req.body.workout;
    const duration = req.body.duration;
    const date = req.body.date;
    return Exercise.findOneAndUpdate(
        {_id: req.params.id},
        {$set: {workout, duration, date}},
        {new: true}
    );
}

export function deleteExercise(req){
    return Exercise.findByIdAndDelete({
        _id: req.params.id,
    });
}

