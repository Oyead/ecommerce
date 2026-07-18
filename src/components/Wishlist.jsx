import React from 'react'
import useQueryWishlist, { getWishlist } from '../hooks/useQueryWishlist'
import useMutationWishlist, { RemoveItem } from '../hooks/useMutationWishlist'
import useMutationCart, { addToCart } from '../hooks/useMutationCart'
import Loading from './Loading'
import toast from 'react-hot-toast'

export default function Wishlist() {
  const { data, isLoading, isError, error, refetch } = useQueryWishlist(getWishlist)
  const { mutate: mutateRemove } = useMutationWishlist(RemoveItem)
  const { mutate: mutateCart } = useMutationCart(addToCart)

  if (isLoading) return <Loading />
  if (isError) return <div className="container py-16 empty-state"><p className="text-red-500">Error: {error.message}</p></div>

  const handleAddToCart = (productId) => {
    mutateCart(productId, {
      onSuccess: () => {
        mutateRemove(productId, {
          onSuccess: () => {
            toast.success('Item moved to cart')
            refetch()
          },
          onError: () => toast.error('Failed to remove from wishlist'),
        })
      },
      onError: () => toast.error('Failed to add to cart'),
    })
  }

  const items = data?.data?.data || []

  if (!items.length) {
    return (
      <div className="container py-12 sm:py-16 px-4">
        <div className="empty-state">
          <i className="fa-regular fa-heart text-5xl sm:text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 text-sm">Browse products and add your favorites here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6 sm:py-8 px-4">
      <h1 className="page-title text-xl sm:text-2xl">
        <i className="fa-solid fa-heart mr-2 text-red-400"></i>My Wishlist
        <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">({items.length} items)</span>
      </h1>

      <div className="space-y-3 sm:space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 hover:shadow-md transition-all duration-300">
            {/* Mobile: stacked */}
            <div className="flex sm:hidden items-start gap-3">
              <img src={item.imageCover} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" alt="" />
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                <p className="text-green-color font-bold text-xs mt-1">{item.price} EGP</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className="bg-green-color hover:bg-green-700 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                  >
                    <i className="fa-solid fa-cart-plus mr-1"></i>Add
                  </button>
                  <button
                    onClick={() => mutateRemove(item.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop: horizontal */}
            <div className="hidden sm:flex items-center gap-4">
              <img src={item.imageCover} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" alt="" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
                <p className="text-green-color font-bold text-sm mt-1">{item.price} EGP</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="bg-green-color hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all duration-200"
                >
                  <i className="fa-solid fa-cart-plus mr-1"></i>Add to Cart
                </button>
                <button
                  onClick={() => mutateRemove(item.id)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
