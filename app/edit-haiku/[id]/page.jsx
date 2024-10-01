import HaikuForm from "@/components/HaikuForm"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import { redirect } from "next/navigation"
import { getUserFromCookie } from "@/lib/getUser"


async function getDoc(id) {
    const haikuCollection = await getCollection('haikus')
    const result  =await haikuCollection.findOne({_id:ObjectId.createFromHexString(id)})
    return result
}

export default async function Page(props){

    const doc =await getDoc(props.params.id)
    const user =await  getUserFromCookie()  
      

    if(user?.userId!==doc.auther.toString()){
        return redirect("/")
    }
    
    return (
        <div>
            <div className='text-center'>
            <h1 className='text-2xl mb-5 border-b-2 text-black'>Edit Haiku</h1>
        </div>
            <HaikuForm haiku={doc} action="edit"/>
        </div>
    )
}