import { User } from "../models/user.js";
import jwt from "jsonwebtoken"

//this function checking in to the db's User table return a document from the db's User table
export function getUserByEmail(request) {
    return User.findOne({
        email: request.body.email,
    });
}

export function getUserById(id){
    return User.findById(id).select("_id username email");
}


export function generateToken(id){
    return jwt.sign({id}, process.env.SECRET_KEY);
}


export function updatePassword(email, password) {
    return User.findOneAndUpdate(
        {email: email},
        {$set: {password: password}},
        {new: true}
    );
}