import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getUserFromCookie } from "@/lib/getUser";



cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const user=await getUserFromCookie()
    if(!user){
        return NextResponse .json({message:"Sorry"})
    }
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json({ error: "Missing parameters to sign" }, { status: 400 });
    }

    const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
    return NextResponse.json({ signature });
  } catch (error) {
    console.error("Error generating signature:", error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
