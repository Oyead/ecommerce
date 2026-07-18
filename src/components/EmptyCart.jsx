import React from 'react'

export default function EmptyCart() {
  return (
    <div className="empty-state py-16">
      <i className="fa-solid fa-cart-shopping text-6xl text-gray-300 mb-4"></i>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-500">Start shopping to add items to your cart</p>
    </div>
  )
}
