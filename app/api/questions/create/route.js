// import prisma from "@/lib/prisma";
// import { headers } from "next/dist/client/components/headers";
import { NextRequest, NextResponse } from "next/server";
// import { withIronSessionApiRoute } from 'iron-session/next'
// import { sessionOption } from "@/lib/iron-session";


/**
 * 
 * @param {NextRequest} request
 */
export async function POST(request) {
	/**
	 * Check user is admin
	 * Validate data fields
	 * Create new Record
	 * Return success response or any error
	*/
	return NextResponse.json({ ok: 200 })
}
