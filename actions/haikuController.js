'use server'

import { getUserFromCookie } from "@/lib/getUser"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/db"
import cloudinary from 'cloudinary'

const cloudinaryConfig = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


function isAlphaNumBasics(text) {
  const regex = /^[a-zA-Z0-9 .,]*$/
  return regex.test(text)
}

async function sharedHaikuLogic(formData, user) {  
  const errors = {}
  const myHaiku = {
    line1: formData.get('line1'),
    line2: formData.get('line2'),
    line3: formData.get('line3'),
    auther: ObjectId.createFromHexString(user.userId)
  }

  if (typeof myHaiku.line1 != 'string') myHaiku.line1 = ''
  if (typeof myHaiku.line2 != 'string') myHaiku.line2 = ''
  if (typeof myHaiku.line3 != 'string') myHaiku.line3 = ''

  myHaiku.line1 = myHaiku.line1.replace(/(\r\n|\n|\r)/g, " ")
  myHaiku.line2 = myHaiku.line2.replace(/(\r\n|\n|\r)/g, " ")
  myHaiku.line3 = myHaiku.line3.replace(/(\r\n|\n|\r)/g, " ")


  myHaiku.line1 = myHaiku.line1.trim()
  myHaiku.line2 = myHaiku.line2.trim()
  myHaiku.line3 = myHaiku.line3.trim()

  if (myHaiku.line1.length < 5) errors.line1 = "At least five syllables"
  if (myHaiku.line1.length > 25) errors.line1 = "Too many syllables ,at least five"

  if (myHaiku.line2.length < 7) errors.line2 = "At least seven syllables"
  if (myHaiku.line2.length > 35) errors.line2 = "Too many syllables ,must be seven"

  if (myHaiku.line3.length < 5) errors.line3 = "At least five syllables"
  if (myHaiku.line3.length > 25) errors.line3 = "Too many syllables ,at least five"


  if (!isAlphaNumBasics(myHaiku.line2)) errors.line2 = "No special charecter allowed"
  if (!isAlphaNumBasics(myHaiku.line3)) errors.line3 = "No special charecter allowed"
  if (!isAlphaNumBasics(myHaiku.line1)) errors.line1 = "No special charecter allowed"

  if (myHaiku.line1.length == 0) errors.line1 = "This filed is required"
  if (myHaiku.line2.length == 0) errors.line2 = "This filed is required"
  if (myHaiku.line3.length == 0) errors.line3 = "This filed is required"


  ///verify signature

  const expectedSign=cloudinary.utils.api_sign_request({public_id:formData.get("public_id"),version:formData.get('version')},cloudinaryConfig.api_secret)

  if(expectedSign===formData.get('signature')){
    myHaiku.photo=formData.get('public_id')
  }


  return {
    errors,
    myHaiku
  }
}

export const createHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie()

  if (!user) {
    redirect('/')
  }

  const results = await sharedHaikuLogic(formData, user)
  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors }
  }

  //save to db

  const haikuCollection = await getCollection('haikus')
  const newHaiku = await haikuCollection.insertOne(results.myHaiku)
  return redirect('/')

}

//delete haiku



export const deleteHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie();
  if (!user) {
      return redirect('/');
  }

  // Ensure formData is defined
  if (!formData) {
      throw new Error('Form data is not defined');
  }

  const haikuCollection = await getCollection('haikus');
  let haikuid = formData.get('id');
  if (typeof haikuid != 'string') haikuid = '';

  const haikuInQuestion = await haikuCollection.findOne({ _id: ObjectId.createFromHexString(haikuid) });
  if (haikuInQuestion.auther.toString() !== user.userId) {
      return redirect('/');
  }

  await haikuCollection.deleteOne({ _id: ObjectId.createFromHexString(haikuid) });
  return redirect('/');
}





////edit haiku


export const editHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie()

  if (!user) {
    redirect('/')
  }

  const results = await sharedHaikuLogic(formData, user)
  if (results.errors.line1 || results.errors.line2 || results.errors.line3) {
    return { errors: results.errors }
  }

  //save to db

  const haikuCollection = await getCollection('haikus')
  let haikuid = formData.get('haikuid')
  if (typeof haikuid != 'string') haikuid = ''

  const haikuInQuestion = await haikuCollection.findOne({ _id: ObjectId.createFromHexString(haikuid) })
  if (haikuInQuestion.auther.toString() !== user.userId) {
    return redirect('/')
  }
  await haikuCollection.findOneAndUpdate({ _id: ObjectId.createFromHexString(haikuid) }, { $set: results.myHaiku })

  return redirect('/')

}