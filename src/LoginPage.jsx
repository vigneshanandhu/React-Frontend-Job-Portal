import React from 'react'
import './App.css'
import { useActionState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

async function loginAction(_, formData) {
    const json = Object.fromEntries(formData)

    const res = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })

    const data = await res.json()

    if (res.ok) {
        localStorage.setItem("userId", data.user_id)
        localStorage.setItem("username", data.username)
    }

    return data.message || "Login Failed"
}

const LoginPage = () => {

    const [message, formAction, isPending] = useActionState(
        loginAction,
        "",
        {
            withPending: true
        }
    )

    const navigate = useNavigate()

    useEffect(() => {
        if (message === "Login successful") {
            navigate("/jobs")
        }
    }, [message, navigate])

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* Navbar */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-blue-700">
                        JobPortal
                    </h1>

                    <nav className="flex gap-3 sm:gap-6 text-sm font-medium text-gray-700">
                        <Link
                            to="/jobs"
                            className="hover:text-blue-700 transition"
                        >
                            Jobs
                        </Link>

                        <Link
                            to="/companies"
                            className="hover:text-blue-700 transition hidden sm:block"
                        >
                            Companies
                        </Link>

                        <Link
                            to="/services"
                            className="hover:text-blue-700 transition hidden sm:block"
                        >
                            Services
                        </Link>

                        <Link
                            to="/register"
                            className="hover:text-blue-700 transition"
                        >
                            Register
                        </Link>
                    </nav>

                </div>
            </header>

            {/* Main Section */}
            <main className="flex-1 flex items-center justify-center px-4 py-10">

                <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

                    {/* Left Side */}
                    <div className="bg-blue-700 text-white p-8 md:p-12 flex flex-col justify-center">

                        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                            Find Your Dream Job
                        </h2>

                        <p className="mt-4 text-blue-100 text-sm md:text-base leading-7">
                            Login to explore thousands of job opportunities
                            from top companies. Build your career with
                            JobPortal.
                        </p>

                        <div className="mt-8 space-y-4">

                            <div className="flex items-center gap-3">
                                <span className="text-xl">✔</span>
                                <p className="text-sm md:text-base">
                                    Trusted by recruiters
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xl">✔</span>
                                <p className="text-sm md:text-base">
                                    Personalized job suggestions
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xl">✔</span>
                                <p className="text-sm md:text-base">
                                    Easy and quick applications
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Right Side */}
                    <div className="p-6 sm:p-10 md:p-12 flex items-center">

                        <div className="w-full">

                            <h2 className="text-3xl font-bold text-center text-gray-800">
                                Welcome Back
                            </h2>

                            <p className="text-center text-gray-500 mt-2">
                                Login to continue
                            </p>

                            <form
                                action={formAction}
                                className="mt-8 space-y-5"
                            >

                                {/* Username */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3
                                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter password"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3
                                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <a
                                        href="#"
                                        className="text-sm text-blue-700 hover:underline"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                {/* Button */}
                                <button
                                    disabled={isPending}
                                    type="submit"
                                    className="w-full bg-blue-700 hover:bg-blue-800
                                    text-white font-semibold py-3 rounded-lg transition"
                                >
                                    {isPending ? "Logging in..." : "Login"}
                                </button>

                                {/* Message */}
                                {
                                    message && (
                                        <p className={`text-center text-sm font-medium ${message === "Login successful"
                                                ? "text-green-600"
                                                : "text-red-600"
                                            }`}>
                                            {message}
                                        </p>
                                    )
                                }

                                {/* Register */}
                                <p className="text-center text-sm text-gray-600">
                                    Don&apos;t have an account?

                                    <Link
                                        to="/register"
                                        className="text-blue-700 font-semibold ml-1 hover:underline"
                                    >
                                        Register
                                    </Link>
                                </p>

                            </form>

                        </div>

                    </div>

                </div>

            </main>

            {/* Footer */}
            <footer className="bg-white border-t">
                <div className="max-w-7xl mx-auto px-4 py-5 text-center text-sm text-gray-500">
                    © 2026 JobPortal. All rights reserved.
                </div>
            </footer>

        </div>
    )
}

export default LoginPage