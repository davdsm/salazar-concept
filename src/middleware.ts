import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|logo/|home/|images/).*)"],
};
