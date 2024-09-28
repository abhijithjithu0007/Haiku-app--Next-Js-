import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"

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
                </div>
            ))}
        </div>
    )
}

