import React, { useActionState, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AxiosInstance from './AxiosInstance'

const ApplyJobPage = () => {

    const [job, setJob] = useState(null)

    const [result, formAction, isPending] = useActionState(
        applyJobAction,
        null,
        {
            withPending: true
        }
    )

    const username = localStorage.getItem("username") || "Guest"

    const { jobId } = useParams()

    const userId = localStorage.getItem("userId")



    // Fetch Particular Job Details
    useEffect(() => {

        AxiosInstance.get(`/jobs/${jobId}/`)
            .then(response => setJob(response.data))
            .catch(error => console.error("Failed to fetch job:", error))

    }, [jobId])



    // Apply Job
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


            {/* HEADER */}
            <header className="border-b bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

                    <h1 className="text-xl font-bold text-blue-700">
                        JobPortal
                    </h1>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Hello, {username}
                        </span>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
                            {username.charAt(0).toUpperCase()}
                        </div>
                    </div>

                </div>
            </header>



            {/* MAIN */}
            <main className="flex-1 px-4 py-8">

                <div className="max-w-7xl mx-auto">

                    {/* Back Button */}
                    <Link
                        to="/jobs"
                        className="inline-flex items-center gap-2 mb-6
                        text-sm font-medium text-blue-600
                        hover:text-blue-700 hover:underline"
                    >
                        ← Back to Jobs
                    </Link>



                    {!job ? (

                        <p className="text-center text-gray-600">
                            Loading Job Details...
                        </p>

                    ) : (

                        <div className="grid gap-6 lg:grid-cols-3">

                            {/* JOB DETAILS */}
                            <div className="lg:col-span-2 rounded-lg border bg-white p-6">

                                <h2 className="text-2xl font-bold text-blue-700">
                                    {job.title}
                                </h2>

                                <p className="mt-2 text-lg text-gray-700">
                                    {job.company}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">

                                    <span className="rounded bg-gray-100 px-3 py-1">
                                        📍 {job.location}
                                    </span>

                                    <span className="rounded bg-gray-100 px-3 py-1">
                                        💰 {job.salary}
                                    </span>

                                    <span className="rounded bg-gray-100 px-3 py-1">
                                        🕒 Full Time
                                    </span>

                                </div>



                                {/* DESCRIPTION */}
                                <div className="mt-6">

                                    <h3 className="text-lg font-semibold">
                                        Job Description
                                    </h3>

                                    <p className="mt-2 text-gray-600 leading-7">
                                        {job.description}
                                    </p>

                                </div>



                            
                            </div>



                            {/* APPLY FORM */}
                            <div className="rounded-lg border bg-white p-6 h-fit">

                                <h2 className="text-lg font-semibold text-gray-900">
                                    Apply for this job
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Your profile will be shared with recruiter
                                </p>

                                <form
                                    action={formAction}
                                    className="mt-5 space-y-4"
                                >

                                    <button
                                        type="submit"
                                        className="w-full rounded-lg bg-blue-700 py-2.5
                                        font-semibold text-white
                                        hover:bg-blue-800"
                                    >
                                        {isPending
                                            ? "Applying..."
                                            : "Submit Application"}
                                    </button>



                                    {result && (

                                        <p
                                            className={`text-center text-sm ${
                                                result.success
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {result.message}
                                        </p>

                                    )}

                                </form>

                            </div>

                        </div>

                    )}

                </div>

            </main>



            {/* FOOTER */}
            <footer className="border-t bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
                    © 2026 JobPortal.com | All rights reserved
                </div>
            </footer>

        </div>
    )
}

export default ApplyJobPage