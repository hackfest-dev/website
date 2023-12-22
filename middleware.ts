//This is a middleware that runs prior to the controller

//import { getSession } from "next-auth/react";
//import { NextRequest, NextResponse } from "next/server";
//import prisma from "@/lib/db";
//import { getServerSession } from "next-auth";
//import { authOptions } from "./lib/auth";
//
//export async function middleware(req: NextRequest) {
//	const path = req.nextUrl.pathname;
//	console.log(path);
//
//	//For user routes
//	if (path.startsWith("/api/user")) {
//		const user = await getServerSession(authOptions);
//		console.log(user);
//		if (user) return NextResponse.rewrite(req.url);
//		return NextResponse.redirect(
//			new URL(req.url).origin + "/api/auth/signin"
//		);
//	}
//
//	if (path.startsWith("/api/user/register")) {
//		const appSettings = await prisma.appSettings.findFirst();
//		if (appSettings?.isRegistrationOpen)
//			return NextResponse.rewrite(req.url);
//		return NextResponse.json({ message: "Registration is closed" });
//	}
//
//	//For admin routes
//	if (path.startsWith("/api/admin")) {
//		const user = await getSession();
//		if (!user) return NextResponse.redirect("/api/auth/signin");
//		const dbUser = await prisma.user.findUnique({
//			where: {
//				id: user.user.id,
//			},
//		});
//		if (dbUser?.role === "ADMIN") return NextResponse.rewrite(req.url);
//		return NextResponse.redirect("/api/auth/signin");
//	}
//	//Add middleware for other paths here
//}
//
//export const config = {
//	matcher: ["/api/user/:path*"],
//};
//
export {default} from "next-auth/middleware";
