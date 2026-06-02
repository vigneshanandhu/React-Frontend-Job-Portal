import React from 'react'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import JobListPage from './JobListPage'
import ApplyJobPage from './ApplyJobPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jobs" element={<JobListPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply/:jobId" element={<ApplyJobPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App