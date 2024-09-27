"use server"
import { getCollection } from "@/lib/db"
import bcrypt from 'bcrypt'

export const register = async function (prevState, formData) {
    const errors = {}

    const ourUser = {
        username: formData.get('username'),
        password: formData.get('password')
    }

    if (typeof ourUser.username !== 'string') ourUser.username = ''
    if (typeof ourUser.password !== 'string') ourUser.password = ''


    ourUser.username = ourUser.username.trim()
    ourUser.password = ourUser.password.trim()

    if (ourUser.username.length < 3) errors.username = "Username must have at least 3 characters.";
    if (ourUser.password.length > 30) errors.password = "Password cannot exceed 30 characters.";
    if (ourUser.password.length < 4) errors.password = "Password atleast want 4 characters.";

    if (errors.username || errors.password) {
        return {
            errors: errors,
            success: false
        };
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10)
    ourUser.password=bcrypt.hashSync(ourUser.password,salt)



    const userCollection=await getCollection('users')
    await userCollection.insertOne(ourUser)
    
    return {
        success:true
    }
    //stroing a new user db
    //log the user in by giving cookie

}