import React, { useContext, useState } from "react"
import useQueryCart, { getCarts } from "../hooks/useQueryCart"
import useMutationCart, { clearCart, deleteItem, updateCount } from "../hooks/useMutationCart"
import img from "/public/assets/images/empty.png"
import Loading from "./Loading"
import Payemnt from "./Payemnt"
import { numItem } from "../Context/NumcartContext"

export default function Cart() {
  const { cartNum, setCartNums } = useContext(numItem)
  const { data, isError, error, isLoading } = useQueryCart(getCarts)
  const { mutate, isPending } = useMutationCart(deleteItem)
  const { mutate: mutateClear, isPending: ispindingClear } = useMutationCart(clearCart)
  const { mutate: mutateupdate, isPending: ispindingupdate } = useMutationCart(updateCount)
  const [isOpen, setOpen] = useState(false)

  if (typeof setCartNums !== "function") {
    console.error("setCartNums is not a function. Check your context provider.")
    return null
  }

  if (!data?.data?.numOfCartItems) {
    return (
      <div className="container py-12 sm:py-16 px-4">
        <div className="empty-state">
          <img src={img} alt="Empty cart" className="w-40 sm:w-64 mb-6" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 text-sm">Looks like you haven't added anything yet</p>
          <a href="/products" className="btn-primary inline-flex items-center gap-2 text-sm">
            <i className="fa-solid fa-bag-shopping"></i>Start Shopping
          </a>
        </div>
      </div>
    )
  }

  setCartNums(data.data.numOfCartItems)

  if (isLoading || isPending || ispindingClear || ispindingupdate) {
    return <Loading />
  }

  return (
    <div className="container py-6 sm:py-8 px-4">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                <i className="fa-solid fa-shopping-cart mr-2 text-green-color"></i>
                Shopping Cart
                <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">({data?.data?.numOfCartItems} items)</span>
              </h1>
            </div>

            <div className="divide-y divide-gray-50">
              {data?.data?.data?.products.map((prod) => (
                <div key={prod?.product?._id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                  {/* Mobile: stacked layout */}
                  <div className="flex sm:hidden gap-3">
                    <img src={prod?.product?.imageCover} className="w-16 h-16 object-cover rounded-xl flex-shrink-0" alt="" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-semibold text-gray-800 line-clamp-2">{prod?.product?.title}</h3>
                      <p className="text-green-color font-bold text-xs mt-1">{prod?.price} EGP</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count - 1 })}
                            className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                          >
                            <i className="fa-solid fa-minus text-[10px]"></i>
                          </button>
                          <span className="w-8 text-center font-semibold text-xs">{prod?.count}</span>
                          <button
                            onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count + 1 })}
                            className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                          >
                            <i className="fa-solid fa-plus text-[10px]"></i>
                          </button>
                        </div>
                        <button
                          onClick={() => mutate(prod?.product?._id)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: horizontal layout */}
                  <div className="hidden sm:flex items-center gap-4">
                    <img src={prod?.product?.imageCover} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" alt="" />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{prod?.product?.title}</h3>
                      <p className="text-green-color font-bold text-sm mt-1">{prod?.price} EGP</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count - 1 })}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fa-solid fa-minus text-xs"></i>
                      </button>
                      <span className="w-10 text-center font-semibold text-sm">{prod?.count}</span>
                      <button
                        onClick={() => mutateupdate({ productId: prod?.product?._id, count: prod?.count + 1 })}
                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                      >
                        <i className="fa-solid fa-plus text-xs"></i>
                      </button>
                    </div>
                    <button
                      onClick={() => mutate(prod?.product?._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <i className="fa-solid fa-trash-can text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:sticky lg:top-20">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({data?.data?.numOfCartItems} items)</span>
                <span className="font-medium">{data?.data?.data?.totalCartPrice} EGP</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-color font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-green-color text-base sm:text-lg">{data?.data?.data?.totalCartPrice} EGP</span>
              </div>
            </div>

            <button
              onClick={() => setOpen(!isOpen)}
              className="w-full bg-green-color hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mb-3 text-sm"
            >
              <i className="fa-solid fa-credit-card mr-2"></i>Proceed to Payment
            </button>

            <button
              onClick={mutateClear}
              className="w-full border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-300 font-medium py-3 rounded-xl transition-all duration-300 text-sm"
            >
              <i className="fa-solid fa-trash-can mr-2"></i>Clear Cart
            </button>

            {isOpen && <div className="mt-6 pt-6 border-t border-gray-100"><Payemnt cartId={data?.data?.cartId} /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
