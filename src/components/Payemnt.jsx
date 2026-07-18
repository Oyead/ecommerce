import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { paymentOnline } from '../apis/payment'
import { useFormik } from 'formik'
import * as motion from 'motion/react-client'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

export default function Payment({ cartId }) {
  let navigate = useNavigate()

  let { mutate, data } = useMutation({
    mutationFn: paymentOnline,
    onSuccess: (data) => {
      if (data?.data?.status === 'success') {
        window.location.href = 'https://buy.stripe.com/test_3csg0o03hfYh9m8288'
      }
    },
  })

  function handlePayment(values) {
    const { details, city, phone } = values
    mutate({ cartId, shippingAddress: { details, city, phone } })
  }

  let validationSchema = Yup.object().shape({
    details: Yup.string().required('Details are required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string().required('Phone number is required').matches(/^01[0125][0-9]{8}$/, 'Not a valid phone number'),
  })

  let formik = useFormik({
    initialValues: { details: '', city: '', phone: '' },
    validationSchema,
    onSubmit: (values) => handlePayment(values),
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        <i className="fa-solid fa-credit-card mr-2 text-green-color"></i>Shipping Details
      </h3>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address Details</label>
          <input
            type="text"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="details"
            className="input-field"
            placeholder="Street address, building, etc."
          />
          {formik.touched.details && formik.errors.details && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.details}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="city"
            className="input-field"
            placeholder="e.g. Cairo"
          />
          {formik.touched.city && formik.errors.city && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phone"
            className="input-field"
            placeholder="e.g. 01012345678"
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="mt-1 text-xs text-red-600">{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-color hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <i className="fa-solid fa-lock"></i>Pay Securely
        </button>
      </form>
    </motion.div>
  )
}
