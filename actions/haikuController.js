'use server'

import { getUserFromCookie } from "@/lib/getUser"
import { redirect } from "next/navigation"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/db"


function isAlphaNumBasics(text){
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
   

    if(!isAlphaNumBasics(myHaiku.line2)) errors.line2="No special charecter allowed"
    if(!isAlphaNumBasics(myHaiku.line3)) errors.line3="No special charecter allowed"
    if(!isAlphaNumBasics(myHaiku.line1)) errors.line1="No special charecter allowed"

  if(myHaiku.line1.length==0) errors.line1="This filed is required"
  if(myHaiku.line2.length==0) errors.line2="This filed is required"
  if(myHaiku.line3.length==0) errors.line3="This filed is required"


  return{
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
    if(results.errors.line1||results.errors.line2||results.errors.line3){
        return {errors:results.errors}
    }

    //save to db

    const haikuCollection = await getCollection('haikus')
    const newHaiku = await haikuCollection.insertOne(results.myHaiku)
    return redirect('/')

}