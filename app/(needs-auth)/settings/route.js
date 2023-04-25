import { NextResponse } from "next/server";

/** @param {import("next/server").NextResponse} req */
export const GET = (req) => {
  return NextResponse.redirect(new URL("/settings/answers", process.env.BASE_URL || req.url));
};
