import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const passwordSchema = Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await passwordSchema.validate(newPassword)

      if (newPassword !== confirmPassword) {
        setMessage('Passwords do not match.')
        setMessageType('error')
        setLoading(false)
        return
      }

      const email = localStorage.getItem('resetEmail')
      console.log('New password for', email, ':', newPassword)

      setMessage('Password reset successfully!')
      setMessageType('success')

      localStorage.removeItem('resetCode')
      localStorage.removeItem('resetEmail')

      setTimeout(() => navigate('/login'), 1500)
    } catch (error) {
      setMessage(error.message)
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
              <i className="fa-solid fa-lock text-2xl text-green-color"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">New Password</h2>
            <p className="text-gray-500 mt-2 text-sm">Create a new password for your account</p>
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
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                <i className="fa-solid fa-lock mr-2 text-green-color"></i>New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="input-field"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                <i className="fa-solid fa-shield-halved mr-2 text-green-color"></i>Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
                placeholder="Re-enter new password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-color hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner animate-spin"></i>Resetting...</>
              ) : (
                <><i className="fa-solid fa-check-circle"></i>Reset Password</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
