'use server'

import { getUserFromCookie } from "@/lib/getUser"
import { redirect } from "next/navigation"

async function sharedHaikuLogic(){

}

export const createHaiku= async function(prevState,formData) {
    const user =await getUserFromCookie()

    if(!user){
        redirect('/')
    }

    const results =await sharedHaikuLogic(formData,user)
   
}