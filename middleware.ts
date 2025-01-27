import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Check if the application is installed
  const isInstalled = process.env.IS_INSTALLED === "true"

  // If the app is not installed and the user is not on the install page, redirect to install
  if (!isInstalled && !request.nextUrl.pathname.startsWith("/install")) {
    return NextResponse.redirect(new URL("/install", request.url))
  }

  // If the app is installed and the user tries to access the install page, check for SUPERADMIN role
  if (isInstalled && request.nextUrl.pathname.startsWith("/install")) {
    if (token?.role !== "SUPERADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

