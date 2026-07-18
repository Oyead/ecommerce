import React, { useContext, useState } from 'react'
import logo from '/public/assets/images/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { userToken } from '../Context/UserToken.jsx'
import { numItem } from '../Context/NumcartContext.jsx'

export default function Navbar() {
  let { isLogin, setLogin } = useContext(userToken)
  let { cartNum } = useContext(numItem)
  let navigate = useNavigate()
  let [mobileOpen, setMobileOpen] = useState(false)

  function logout() {
    localStorage.removeItem('token')
    setLogin(null)
    setMobileOpen(false)
    navigate('/')
  }

  function handleNavClick() {
    setMobileOpen(false)
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 sm:px-6 py-3">
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={logo} className="h-7 sm:h-8" alt="FreshCart" />
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-600 rounded-lg lg:hidden hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M1 1l14 12M1 13L15 1" : "M1 1h15M1 7h15M1 13h15"} />
          </svg>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:items-center lg:gap-2 lg:w-auto">
          <ul className="flex items-center gap-1 font-medium">
            {[
              { to: '/home', label: 'Home', icon: 'fa-house' },
              { to: '/products', label: 'Products', icon: 'fa-bag-shopping' },
              { to: '/categories', label: 'Categories', icon: 'fa-grid-2' },
              { to: '/brands', label: 'Brands', icon: 'fa-tags' },
            ].map(item => (
              <li key={item.to}>
                <Link to={item.to} className="flex items-center py-2 px-3 text-gray-600 hover:text-green-color rounded-lg hover:bg-green-50 transition-all duration-200 text-sm">
                  <i className={`fa-solid ${item.icon} mr-1.5 text-xs`}></i>{item.label}
                </Link>
              </li>
            ))}
            {isLogin && (
              <>
                <li>
                  <Link to="/wishlist" className="flex items-center py-2 px-3 text-gray-600 hover:text-green-color rounded-lg hover:bg-green-50 transition-all duration-200 text-sm">
                    <i className="fa-solid fa-heart mr-1.5 text-xs"></i>Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="flex items-center py-2 px-3 text-gray-600 hover:text-green-color rounded-lg hover:bg-green-50 transition-all duration-200 text-sm relative">
                    <i className="fa-solid fa-shopping-cart mr-1.5 text-xs"></i>Cart
                    {cartNum > 0 && (
                      <span className="absolute -top-0.5 -right-1 bg-green-color text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {cartNum > 99 ? '99+' : cartNum}
                      </span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200">
            {isLogin ? (
              <button onClick={logout} className="py-2 px-3 text-gray-600 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium text-sm">
                <i className="fa-solid fa-right-from-bracket mr-1.5"></i>Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="py-2 px-3 text-gray-600 hover:text-green-color rounded-lg hover:bg-green-50 transition-all duration-200 font-medium text-sm">Sign In</Link>
                <Link to="/register" className="py-2 px-3 bg-green-color text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-medium text-sm">Sign Up</Link>
              </>
            )}
            <div className="flex items-center gap-3 ml-2 pl-2 border-l border-gray-200">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><i className="fa-brands fa-youtube text-base"></i></a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><i className="fa-brands fa-google text-base"></i></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook text-base"></i></a>
            </div>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-50">
            <div className="max-w-screen-xl mx-auto px-4 py-4">
              <ul className="space-y-1 font-medium">
                {[
                  { to: '/home', label: 'Home', icon: 'fa-house' },
                  { to: '/products', label: 'Products', icon: 'fa-bag-shopping' },
                  { to: '/categories', label: 'Categories', icon: 'fa-grid-2' },
                  { to: '/brands', label: 'Brands', icon: 'fa-tags' },
                ].map(item => (
                  <li key={item.to}>
                    <Link to={item.to} onClick={handleNavClick} className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-green-color rounded-xl hover:bg-green-50 transition-all duration-200">
                      <i className={`fa-solid ${item.icon} w-5 text-center text-sm text-green-color`}></i>{item.label}
                    </Link>
                  </li>
                ))}
                {isLogin && (
                  <>
                    <li>
                      <Link to="/wishlist" onClick={handleNavClick} className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-green-color rounded-xl hover:bg-green-50 transition-all duration-200">
                        <i className="fa-solid fa-heart w-5 text-center text-sm text-green-color"></i>Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart" onClick={handleNavClick} className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-green-color rounded-xl hover:bg-green-50 transition-all duration-200">
                        <i className="fa-solid fa-shopping-cart w-5 text-center text-sm text-green-color"></i>Cart
                        {cartNum > 0 && (
                          <span className="bg-green-color text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartNum}</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              <div className="border-t border-gray-100 mt-3 pt-3 space-y-1">
                {isLogin ? (
                  <button onClick={logout} className="flex items-center gap-3 w-full py-3 px-4 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium">
                    <i className="fa-solid fa-right-from-bracket w-5 text-center text-sm"></i>Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={handleNavClick} className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium">
                      <i className="fa-solid fa-right-to-bracket w-5 text-center text-sm text-green-color"></i>Sign In
                    </Link>
                    <Link to="/register" onClick={handleNavClick} className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium">
                      <i className="fa-solid fa-user-plus w-5 text-center text-sm text-green-color"></i>Create Account
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors"><i className="fa-brands fa-youtube text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors"><i className="fa-brands fa-google text-xl"></i></a>
                <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook text-xl"></i></a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
