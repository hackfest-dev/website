import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import HackfestError from "@/lib/utils/customError";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
	const { name, phone, collegeId, adhaar, collegeIdImage } = await req.json();
	try {
		const user = await getServerSession(authOptions);
		console.log(user);
		if (!user) {
			throw new HackfestError("AUTH_ERROR", "You are not logged in");
		}
		await prisma.user.update({
			where: {
				id: user.user.id,
			},
			data: {
				name,
				collegeId,
				adhaar,
				college_id: collegeIdImage,
				phone,
				college: {
					connect: {
						id: collegeId,
					},
				},
			},
		});
		NextResponse.redirect("/dashboard");
	} catch (error) {
		console.log(error);
		if (error instanceof HackfestError) {
			return NextResponse.json({
				error: error.type,
				message: error.message,
			});
		} else {
			return NextResponse.json({
				error: "SERVER_ERROR",
				message: "Something went wrong",
			});
		}
	}
}
