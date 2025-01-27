import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Check if the application is installed
  const isInstalled = process.env.IS_INSTALLED === "true"

  // If the app is not installed and the user is not on the setup page, redirect to setup
  if (!isInstalled && !request.nextUrl.pathname.startsWith("/setup")) {
    return NextResponse.redirect(new URL("/setup", request.url))
  }

  // If the app is installed and the user tries to access the setup page, redirect to dashboard
  if (isInstalled && request.nextUrl.pathname.startsWith("/setup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

