"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa"

export function AuthButtons() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={() => signIn("google")}>
        <FaGoogle className="mr-2" /> Google
      </Button>
      <Button variant="outline" onClick={() => signIn("facebook")}>
        <FaFacebook className="mr-2" /> Facebook
      </Button>
      <Button variant="outline" onClick={() => signIn("twitter")}>
        <FaTwitter className="mr-2" /> Twitter
      </Button>
    </div>
  )
}

