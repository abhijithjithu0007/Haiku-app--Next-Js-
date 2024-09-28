import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import Link from "next/link"

async function getHaiku(id) {
    const collection = await getCollection('haikus')

    const results = await collection.find({ auther: new ObjectId(id) }).sort().toArray()
    return results

}

export default async function Dashborad(prop) {
    const haiku = await getHaiku(prop.user.userId)
    
    return (
        <div>
            <h1>this is you all haikus</h1>
            {haiku.map((haiku, ind) => (
                <div key={ind}>
                    <div>
                        {haiku.line1}
                    </div>
                    <div>
                        {haiku.line2}

                    </div>
                    <div>
                        {haiku.line3}

                    </div>
                    <Link className="bg-green-400 p-1 rounded-lg text-black m-4 pr-5 px-6" href={`/edit-haiku/${haiku._id.toString()}`}>Edit</Link>
                </div>
            ))}
        </div>
    )
}

