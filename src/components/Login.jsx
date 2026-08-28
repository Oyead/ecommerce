import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userToken } from '../Context/UserToken'
import { api } from '../apis/client'

export default function Login() {
  let { setLogin } = useContext(userToken)
  let navigate = useNavigate()
  let [errMsg, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)

  async function handlelogin(values) {
    setLoading(true)
    try {
      let { data } = await api.post(`/auth/signin`, values)
      if (data.message === 'success') {
        setLogin(data.token)
        localStorage.setItem('token', data.token)
        navigate('/cart')
      }
      setLoading(false)
      setErrMsg('')
    } catch (error) {
      setErrMsg('Email or password is incorrect')
      setLoading(false)
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Please enter a valid email'),
    password: Yup.string().required('Password is required'),
  })

  let formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: handlelogin
  })

  return (
    <div className="container py-8 sm:py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-right-to-bracket text-2xl text-green-color"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2 text-sm">Sign in to your account</p>
          </div>

          {errMsg && (
            <div className="flex items-center gap-3 p-4 mb-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{errMsg}</span>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                <i className="fa-solid fa-envelope mr-2 text-green-color"></i>Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="input-field"
                placeholder="e.g. john@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <i className="fa-solid fa-circle-info"></i>{formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                <i className="fa-solid fa-lock mr-2 text-green-color"></i>Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.password}
                className="input-field"
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <i className="fa-solid fa-circle-info"></i>{formik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-color hover:bg-green-700 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner animate-spin"></i>Signing In...</>
              ) : (
                <><i className="fa-solid fa-right-to-bracket"></i>Sign In</>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/passwordrecovery" className="text-sm text-gray-500 hover:text-green-color transition-colors">
              <i className="fa-solid fa-key mr-1"></i>Forgot your password?
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-color hover:underline font-medium">Register Now!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
