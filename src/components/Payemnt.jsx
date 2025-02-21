import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { paymentOnline } from '../Apis/payment';
import { useFormik } from 'formik';
import * as motion from 'motion/react-client';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Payment({ cartId }) {
  let navigate = useNavigate(); 

  let { mutate, data } = useMutation({
    mutationFn: paymentOnline,
    onSuccess: (data) => {
      if (data?.data?.status === 'success') {
        window.location.href = 'https://buy.stripe.com/test_3csg0o03hfYh9m8288';
      }
    },
  });

  function handlePayment(values) {
    const { details, city, phone } = values;
    mutate({ cartId, shippingAddress: { details, city, phone } });
  }

  let validationSchema = Yup.object().shape({
    details: Yup.string().required('Details are required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/(01)[0-25][0-9]{8}$/, 'Not a valid phone number'),
  });

  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handlePayment(values);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <h2 className="my-4 text-2xl font-bold">Payment</h2>
      <form onSubmit={formik.handleSubmit}>
        <p>Details</p>
        <input
          type="text"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="details"
        />
        {formik.touched.details && formik.errors.details ? (
          <div className="text-red-500">{formik.errors.details}</div>
        ) : null}

        <br />
        <p>Address</p>
        <input
          type="text"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="city"
        />
        {formik.touched.city && formik.errors.city ? (
          <div className="text-red-500">{formik.errors.city}</div>
        ) : null}

        <br />
        <p>Phone</p>
        <input
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="phone"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-500">{formik.errors.phone}</div>
        ) : null}

        <br />
        <br />
        <button type="submit" className="p-4 bg-green-500">
          Submit
        </button>
      </form>
    </motion.div>
  );
}