import React, { useContext, useEffect, useRef } from 'react'
import logo from '/public/assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { userToken } from '../Context/UserToken.jsx'
import { numItem } from '../Context/NumcartContext.jsx'


export default function Navbar() {

  let { isLogin, setLogin } = useContext(userToken)
    let {cartNum} = useContext(numItem)

  let ref = useRef(null)

  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token')
    setLogin(null)
    navigate('/')
  }

useEffect(()=>{
if(localStorage.getItem('theme'))
 { document.body.classList.add('dark')
ref.current.checked=true}
},[])

  function toggleMe()
  {
    let body = document.body;
    
    if(ref.current.checked)
     { 
      body.classList.add('dark')
      localStorage.setItem('theme','dark')
     }
    else
   { body.classList.remove('dark')
    localStorage.removeItem('theme')}
    
  }

  return (

    <nav className="bg-light-color border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex   flex-wrap justify-between lg:justify-start items-center  mx-auto p-4">
        <Link to="/" className="flex  w-[20%] items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="" alt="" />
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className="hidden lg:flex lg:justify-between w-[80%]  " id="navbar-default">
          <ul className="  font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/home" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white " >Home</Link>
            </li>
            <li>
              <Link to="/products" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">Products</Link>
            </li>
            <li>
              <Link to="/categories" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">Categories</Link>
            </li>
            <li>
              <Link to="/brands" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">Brands</Link>
            </li>
            {isLogin && <li>
              <Link to="/wishlist" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">
              Wishlist
              </Link>
            </li>}
            {isLogin && <li>
              <Link to="/cart" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">
              <i className='fa-solid fa-shopping-cart'></i>
              {cartNum}
              </Link>
            </li>}
          </ul>
          <ul className=" font-medium flex flex-col p-4 lg:p-0 mt-4 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">



            {isLogin ? <li onClick={logout}>
              <span className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white cursor-pointer ">logout</span>
            </li> :

              <>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">Register</Link>
                </li>
              </>

            }
            <li>
              <a href="#" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">
                <i className='fa-brands fa-youtube'></i>
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white "> <i className='fa-brands fa-google'></i></a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-500  rounded lg:bg-transparent lg:p-0 dark:text-white ">
                <i className='fa-brands fa-facebook'></i>
              </a>
            </li>
            <li>
              <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input type="checkbox" name="toggle" ref={ref} onChange={toggleMe}  id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
              <label for="toggle" class="text-xs text-gray-700"></label>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  )
}
