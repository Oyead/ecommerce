import React from 'react'

export default function OTPinput() {
  return (
    <div className="container py-16">
      <div className="empty-state">
        <i className="fa-solid fa-key-skeleton text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-xl font-bold text-gray-800 mb-2">OTP Verification</h2>
        <p className="text-gray-500">Enter the verification code sent to your email</p>
      </div>
    </div>
  )
}
