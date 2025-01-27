"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    async function verifyEmail() {
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })

        if (response.ok) {
          setIsVerified(true)
        } else {
          throw new Error("Failed to verify email")
        }
      } catch (error) {
        console.error("Email verification error:", error)
        // Here you would typically show an error message to the user
      } finally {
        setIsLoading(false)
      }
    }

    verifyEmail()
  }, [token])

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Verifying your email</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Icons.spinner className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Invalid verification link</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The verification link is invalid or has expired.</p>
            <Button className="mt-4 w-full" onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isVerified ? "Email Verified" : "Verification Failed"}</CardTitle>
        </CardHeader>
        <CardContent>
          {isVerified ? (
            <>
              <p>Your email has been successfully verified.</p>
              <Button className="mt-4 w-full" onClick={() => router.push("/login")}>
                Go to Login
              </Button>
            </>
          ) : (
            <>
              <p>We couldn't verify your email. The link may have expired.</p>
              <Button className="mt-4 w-full" onClick={() => router.push("/resend-verification")}>
                Resend Verification Email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

