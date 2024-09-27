"use server"
import { getCollection } from "@/lib/db";
import bcrypt from 'bcrypt';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";


export const logout = async function () {
    cookies().delete('haikuapp')
    redirect('/')
}

export const login = async function (prevState, formData) {
    const ourUser = {
        username: formData.get('username'),
        password: formData.get('password'),
    };

    if (typeof ourUser.username !== 'string') ourUser.username = '';
    if (typeof ourUser.password !== 'string') ourUser.password = '';

    // Check if user exists in the DB
    const collection = await getCollection('users');
    const user = await collection.findOne({ username: ourUser.username });

    if (!user) {
        return {
            success: false,
            message: "Invalid username / password",
        };
    }

    // Check if password matches
    const matchCheck = await bcrypt.compare(ourUser.password, user.password); // Async bcrypt.compare
    if (!matchCheck) {
        return {
            success: false,
            message: "Invalid username / password",
        };
    }

    // Create JWT token
    let myTokenVal;
    try {
        myTokenVal = jwt.sign({ userId: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },process.env.JWTSECRET);
    } catch (error) {
        return {
            success: false,
            message: "Token generation failed. Please try again.",
        };
    }

    // Set cookie with the JWT
    cookies().set('haikuapp', myTokenVal, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true,
    });

    // Redirect after successful login
    return redirect('/');
};

/////////////////////




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

    const userCollection = await getCollection('users')

    const isUserExist = await userCollection.findOne({username:ourUser.username})
  if(isUserExist){
    errors.username="This username is already exist"
  }

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



    const newUser = await userCollection.insertOne(ourUser)
    const userId = newUser.insertedId.toString()

    ///creating JWT //
    const myTokenVal = jwt.sign({ userId: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 }, process.env.JWTSECRET)


    //setting cookie

    cookies().set('haikuapp', myTokenVal, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        secure: true
    })

    return {
        success: true
    }
    //stroing a new user db
    //log the user in by giving cookie

}