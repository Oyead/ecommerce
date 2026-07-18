import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">FreshCart</h3>
            <p className="text-sm leading-relaxed">Your one-stop shop for the freshest products. Quality guaranteed with fast delivery to your doorstep.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/home" className="hover:text-green-color transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-green-color transition-colors">Products</Link></li>
              <li><Link to="/categories" className="hover:text-green-color transition-colors">Categories</Link></li>
              <li><Link to="/brands" className="hover:text-green-color transition-colors">Brands</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-green-color transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-green-color transition-colors">Create Account</Link></li>
              <li><Link to="/cart" className="hover:text-green-color transition-colors">Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-green-color transition-colors">Wishlist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><i className="fa-solid fa-location-dot text-green-color"></i>123 Cairo, Egypt</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-phone text-green-color"></i>+20 123 456 7890</li>
              <li className="flex items-center gap-2"><i className="fa-solid fa-envelope text-green-color"></i>support@freshcart.com</li>
            </ul>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fa-brands fa-facebook-f text-lg"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fa-brands fa-twitter text-lg"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fa-brands fa-instagram text-lg"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><i className="fa-brands fa-youtube text-lg"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-gray-500">&copy; 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
