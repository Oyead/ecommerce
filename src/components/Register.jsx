import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userToken } from './../Context/UserToken'

export default function Register() {
  let { setLogin } = useContext(userToken)
  let navigate = useNavigate()
  let [errMsg, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)

  async function handleRegister(values) {
    setLoading(true)
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      if (data.message === 'success') {
        localStorage.setItem('token', data.token)
        setLogin(data.token)
        navigate('/cart')
      }
      setErrMsg('')
      setLoading(false)
    } catch (error) {
      console.error(error.response?.data || error.message)
      setErrMsg(error.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long').required('Name is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Must contain uppercase, lowercase, and a number').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number').required('Phone number is required')
  })

  let formik = useFormik({
    initialValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    validationSchema,
    onSubmit: handleRegister
  })

  return (
    <div className="container py-8 sm:py-12">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user-plus text-2xl text-green-color"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500 mt-2 text-sm">Join us and start shopping today</p>
          </div>

          {errMsg && (
            <div className="flex items-center gap-3 p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{errMsg}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {[
              { id: 'name', label: 'Full Name', icon: 'fa-user', type: 'text', placeholder: 'e.g. John Doe' },
              { id: 'email', label: 'Email Address', icon: 'fa-envelope', type: 'email', placeholder: 'e.g. john@example.com' },
              { id: 'password', label: 'Password', icon: 'fa-lock', type: 'password', placeholder: 'Create a strong password' },
              { id: 'rePassword', label: 'Confirm Password', icon: 'fa-shield-halved', type: 'password', placeholder: 'Re-enter your password' },
              { id: 'phone', label: 'Phone Number', icon: 'fa-phone', type: 'tel', placeholder: 'e.g. 01012345678' },
            ].map(field => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1.5">
                  <i className={`fa-solid ${field.icon} mr-2 text-green-color`}></i>{field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values[field.id]}
                  className="input-field"
                  placeholder={field.placeholder}
                />
                {formik.touched[field.id] && formik.errors[field.id] && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <i className="fa-solid fa-circle-info"></i>{formik.errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-2">
                <i className="fa-solid fa-circle-check mr-1 text-green-color"></i>Password Requirements:
              </p>
              <ul className="space-y-1">
                {['At least 6 characters long', 'One uppercase letter (A-Z)', 'One lowercase letter (a-z)', 'One number (0-9)'].map((req, i) => (
                  <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
                    <i className="fa-solid fa-check text-[10px] text-green-500"></i>{req}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-color hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner animate-spin"></i>Creating Account...</>
              ) : (
                <><i className="fa-solid fa-arrow-right-to-bracket"></i>Create Account</>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-green-color hover:underline font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
