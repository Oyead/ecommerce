import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { userToken } from '../Context/UserToken'
export default function Login() {

  let {setLogin} = useContext(userToken)

  let navigate = useNavigate()

  let [errMsg, setErrMsg] = useState('')
  let [loading, setLoading] = useState(false)

  async function handlelogin(values) {
    setLoading(true)
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      if (data.message === 'success') {
        setLogin(data.token)
        localStorage.setItem('token',data.token)
        navigate('/cart')
      }
      setLoading(false)
      setErrMsg('')
    } catch (error) {
      setErrMsg('email or password incorect');
      setLoading(false)
    }

  }


  let validationSchema = Yup.object().shape({

    email: Yup.string().required('required').email('email not valid'),
    password: Yup.string().required('required').matches(/^[A-Z][a-z0-9]{2,5}$/),

  })


  let formik = useFormik({
    initialValues: {

      email: '',
      password: '',

    },
    validationSchema
    ,
    onSubmit: handlelogin
  })


  return (
    <div className='container'>
      <h2 className='text-[1.5rem] font-bold my-3 text-center'> login Now:</h2>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
          <input onBlur={formik.handleBlur} type="email" value={formik.values.email} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

          {formik.errors.email && formik.touched.email ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.email} </span>
          </div> : ''}

          {errMsg ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{errMsg} </span>
          </div> : ''}

          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />


 

          {formik.errors.password && formik.touched.password ? <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span class="font-medium">{formik.errors.password} </span>
          </div> : ''}



          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>




        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">

          {loading ? <i className='fa-solid fa-spinner animate-spin text-white'></i> : 'login'}
        </button>
      </form>
     <Link to="/passwordrecovery"><p className='text-center'>Forgot your password?</p></Link>
<div className='max-w-md mx-auto mt-10'>
<p>Don't have an account?</p>
<Link to="/register"><p className=' text-red-600'>Register Now!</p></Link>
</div>
    </div>
  )
}
