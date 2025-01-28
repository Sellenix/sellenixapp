import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p>Hello, {session.user?.email}</p>
      {/* Add more dashboard content here */}
    </div>
  )
}

