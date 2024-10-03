import { getCollection } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    try {
        const collection = await getCollection('haikus');
        const results = await collection.find({ auther: new ObjectId(userId) }).sort({ _id: -1 }).toArray();
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response('Failed to fetch haikus', { status: 500 });
    }
}
