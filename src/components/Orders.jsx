import React from 'react'

export default function Orders() {
  return (
    <div className="container py-12 sm:py-16">
      <div className="empty-state">
        <i className="fa-solid fa-box-open text-5xl sm:text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">My Orders</h2>
        <p className="text-gray-500 text-sm">Your order history will appear here</p>
      </div>
    </div>
  )
}
