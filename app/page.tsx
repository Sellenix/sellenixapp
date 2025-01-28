import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Sellenix</span>
        </h1>
        <p className="mt-3 text-2xl">Get started by logging in or signing up</p>
        <div className="flex mt-6">
          <Link
            href="/auth/login"
            className="mx-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="mx-2 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Register
          </Link>
        </div>
      </main>
    </div>
  )
}

