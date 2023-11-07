import express from "express";
import { deleteExercise, getUserExercise, postNewExercice, updatedExercise } from "../controllers/exercises.js";



const router = express.Router();

router.get("/user/allexercises", async (req, res)=> {
    try {
        const exercises = await getUserExercise(req);
        if (!exercises || exercises.length <= 0) {
            return res.status(404).json({
                message: "Your Exercises are not Available Yet"
            });
        }
        res.status(200).json({
            data: exercises,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/user/addexercise", async (req, res) => {
    try {
        const new_exercise_post = await postNewExercice(req);
        if (!new_exercise_post) {
            return res.status(400).json({
                error: "Error Occured While Uploading my exercise",
            })
        }
        res.status(201).json({
            message: "Successfully Uploaded the My Exercise..",
            data: new_exercise_post,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




router.put("/user/editexercise/:id", async (req, res) => {
    try {
        const editedNotes = await updatedExercise(req);
        if(!updatedExercise){
            return res.status(400).json({
                error: "Error Occured While Updating workout history",
            })
        }
        res.status(200).json({
            message: "Successfully Updated the workout history",
            data: editedNotes,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.delete("/user/delete-exercise/:id", async (req, res) => {
    try {
        const deleteWorkout = await deleteExercise(req);
        if(!deleteWorkout){
            return res.status(400).json({
                error: "Error Occured While Deleting",
            })
        }
        res.status(200).json({
            message: "Successfully Deleted",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export const exerciseRouter = router;