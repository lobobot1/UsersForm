import { NextResponse } from "next/server";

export async function GET(request) {
  const res = NextResponse.redirect(new URL("/login", process.env.BASE_URL || request.url));
  res.cookies.delete("session_cookie");
  return res;
}
