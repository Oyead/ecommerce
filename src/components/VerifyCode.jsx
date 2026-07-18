import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifyCode() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const storedCode = localStorage.getItem('resetCode')

    if (code === storedCode) {
      setMessage('Code verified successfully!')
      setMessageType('success')
      navigate('/ResetPassword')
    } else {
      setMessage('Invalid code. Please try again.')
      setMessageType('error')
    }
  }

  return (
    <div className="container py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-shield-halved text-2xl text-green-color"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Verify Code</h2>
            <p className="text-gray-500 mt-2 text-sm">Enter the 6-digit code sent to your email</p>
          </div>

          {message && (
            <div className={`flex items-center gap-3 p-4 mb-6 text-sm rounded-xl border ${
              messageType === 'success'
                ? 'text-green-700 bg-green-50 border-green-200'
                : 'text-red-700 bg-red-50 border-red-200'
            }`}>
              <i className={`fa-solid ${messageType === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`}></i>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1.5">
                <i className="fa-solid fa-key mr-2 text-green-color"></i>Verification Code
              </label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="input-field text-center text-2xl tracking-[0.5em] font-mono"
                placeholder="000000"
                maxLength="6"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-color hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <i className="fa-solid fa-check-circle"></i>Verify Code
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
