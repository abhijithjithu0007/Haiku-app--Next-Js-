"use server"
import { getCollection } from "@/lib/db"
import bcrypt from 'bcrypt'
import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

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
    ourUser.password = bcrypt.hashSync(ourUser.password, salt)



    const userCollection = await getCollection('users')
    const newUser = await userCollection.insertOne(ourUser)
    const userId = newUser.insertedId.toString()

    ///creating JWT //
    const myTokenVal = jwt.sign({ userId: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, process.env.JWTSECRET)


    //setting cookie

    cookies().set('haikuapp', myTokenVal, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure:true
    })

    return {
        success: true
    }
    //stroing a new user db
    //log the user in by giving cookie

}