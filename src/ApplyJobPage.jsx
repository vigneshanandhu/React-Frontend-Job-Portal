
import React, { useActionState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'



const ApplyJobPage = () => {
    const [result, formAction, isPending] = useActionState(applyJobAction, null, {
        withPending: true
    })

    const username = localStorage.getItem("username") || "Guest"

    const { jobId } = useParams()
    const userId = localStorage.getItem("userId")

    async function applyJobAction() {

    try {

        const response = await AxiosInstance.post('/apply/', {
            job: jobId,
            applicant: userId
        })

        return {
            message: response.data.message,
            success: true
        }

    } catch (error) {

        return {
            message:
                error.response?.data?.message ||
                "Application Failed",
            success: false
        }
    }
}
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">


            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                    <h1 className="text-xl font-bold text-blue-700">JobPortal</h1>

                    <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                        <a href="#" className="hover:text-blue-700">Jobs</a>
                        <a href="#" className="hover:text-blue-700">Companies</a>
                        <a href="#" className="hover:text-blue-700">My Applications</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Hello, {username}</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                            {username.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </div>
            </header>


            <main className="min-h-[calc(100vh-140px)] px-4">


                <div className="max-w-7xl mx-auto pt-6">
                    <Link
                        to="/jobs"
                        className="inline-flex items-center gap-2 mb-4
               text-sm font-medium text-blue-600
               hover:text-blue-700 hover:underline"
                    >
                        ← Back to Jobs
                    </Link>
                </div>


                <div className="flex items-center justify-center py-10">
                    <div className="w-full max-w-md rounded-lg border bg-white p-6">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Apply for this job
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Your profile will be shared with the recruiter
                        </p>

                        <form action={formAction} className="mt-5 space-y-4">

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-700 py-2.5
                   font-semibold text-white
                   hover:bg-blue-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {isPending ? "Applying..." : "Submit Application"}
                            </button>


                            {result && (
                                <p className={`text-center text-sm ${result.success ? "text-green-600" : "text-red-600"}`}>
                                    {result.message}
                                </p>
                            )}



                        </form>
                    </div>
                </div>

            </main>


            <footer className="border-t bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>

        </div>
    )
}

export default ApplyJobPage