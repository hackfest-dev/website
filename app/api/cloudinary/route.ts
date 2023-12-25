import { secrets } from "@/lib/secrets";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	const { timestamp, signature } = await getSignature();
	NextResponse.json({ timestamp, signature });
}

const cloudinaryConfig = cloudinary.config({
	cloud_name: secrets.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: secrets.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: secrets.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
	secure: true,
});

async function getSignature() {
	const timestamp = Math.round(new Date().getTime() / 1000);
	const signature = cloudinary.utils.api_sign_request(
		{
			timestamp,
			folder: "next",
		},
		cloudinaryConfig.api_secret as string
	);
	return { timestamp, signature };
}
