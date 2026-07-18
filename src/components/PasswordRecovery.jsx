import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValidEmail) {
      setMessage('Please enter a valid email address.')
      setMessageType('error')
      setLoading(false)
      return
    }

    const serviceID = 'service_yevfy84'
    const templateID = 'template_537w731'
    const userID = 'f7PNT_LI9ydkjqS1J'
    const resetCode = Math.floor(100000 + Math.random() * 900000)
    const templateParams = { email, reset_code: resetCode }

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID)
      localStorage.setItem('resetCode', resetCode.toString())
      localStorage.setItem('resetEmail', email)
      setMessage('Reset code sent successfully to your email!')
      setMessageType('success')
      navigate('/VerifyCode')
    } catch (error) {
      console.error('Failed to send email:', error)
      setMessage('Failed to send reset code. Please try again.')
      setMessageType('error')
    }
    setLoading(false)
  }

  return (
    <div className="container py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-key text-2xl text-green-color"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Reset Password</h2>
            <p className="text-gray-500 mt-2 text-sm">Enter your email to receive a reset code</p>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                <i className="fa-solid fa-envelope mr-2 text-green-color"></i>Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="Enter your email address"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-color hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner animate-spin"></i>Sending...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i>Send Reset Code</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
