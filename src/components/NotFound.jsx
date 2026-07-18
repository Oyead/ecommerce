import React from 'react'
import { Link } from 'react-router-dom'

export default function Notfound() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="empty-state">
        <div className="text-6xl sm:text-8xl font-bold text-green-color mb-4">404</div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6 sm:mb-8 max-w-md text-sm sm:text-base">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
        <Link to="/home" className="btn-primary inline-flex items-center gap-2 text-sm">
          <i className="fa-solid fa-house"></i>Back to Home
        </Link>
      </div>
    </div>
  )
}
