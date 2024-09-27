import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'


export async function getUserFromCookie() {
    const myCookie = cookies().get('haikuapp')?.value

    if(myCookie){
        try {
            const decoded = jwt.verify(myCookie,process.env.JWTSECRET)
            return decoded
        } catch (error) {
            return null
        }
    }
}