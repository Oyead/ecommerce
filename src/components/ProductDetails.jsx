import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import ProductItem from './Productitem'
import useMutationCart, { addToCart } from '../hooks/useMutationCart'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

export default function ProductDetails() {
  let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart)

  if (isSuccess) toast.success(data?.data?.message)
  if (isError) toast.error(error?.response?.data?.message)

  let [RelatedProducts, setRelatedProducts] = useState([])
  let [imgSrc, setImgSrc] = useState('')
  let [ind, setIndex] = useState(0)
  let { id, catId } = useParams()

  function chnageSrc(e) {
    setIndex(e.target.getAttribute('index'))
    setImgSrc(e.target.src)
  }

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { data: dataobj, isLoading } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: getProductDetails,
    select: (dataobj) => dataobj?.data?.data
  })

  async function getRelatedProducts() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`)
      setRelatedProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRelatedProducts()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="container py-6 sm:py-8 px-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="lg:w-1/3">
            <div className="rounded-2xl overflow-hidden mb-4 bg-gray-50">
              <img src={imgSrc || dataobj?.imageCover} className="w-full h-64 sm:h-80 object-contain" alt={dataobj?.title} />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {dataobj?.images?.map((img, index) => (
                <img
                  key={img}
                  index={index}
                  onClick={chnageSrc}
                  src={img}
                  className={`w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl cursor-pointer flex-shrink-0 transition-all duration-200 ${
                    index == ind ? 'ring-2 ring-green-color ring-offset-2 opacity-100' : 'opacity-50 hover:opacity-75'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-2/3">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="badge-green">{dataobj?.category?.name}</span>
              <span className="badge-yellow">{dataobj?.brand?.name}</span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">{dataobj?.title}</h1>

            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">{dataobj?.description}</p>

            <div className="flex items-center gap-4 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-100">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <i
                    key={i}
                    className={`fa-solid fa-star text-xs sm:text-sm ${
                      i < Math.round(dataobj?.ratingsAverage) ? 'text-rating-color' : 'text-gray-300'
                    }`}
                  ></i>
                ))}
                <span className="text-xs sm:text-sm text-gray-500 ml-1">({dataobj?.ratingsQuantity} reviews)</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
              {dataobj?.priceAfterDiscount ? (
                <>
                  <span className="text-2xl sm:text-3xl font-bold text-green-color">{dataobj?.priceAfterDiscount} EGP</span>
                  <span className="text-sm sm:text-lg text-gray-400 line-through">{dataobj?.price} EGP</span>
                  <span className="badge bg-red-100 text-red-600">
                    {Math.round(((dataobj?.price - dataobj?.priceAfterDiscount) / dataobj?.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl sm:text-3xl font-bold text-gray-800">{dataobj?.price} EGP</span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500">
              <i className="fa-solid fa-truck text-green-color"></i>
              <span>Free delivery on orders over 500 EGP</span>
            </div>

            <button
              onClick={() => mutate(dataobj?._id)}
              className="w-full bg-green-color hover:bg-green-700 text-white font-semibold py-3 sm:py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <i className="fa-solid fa-cart-plus"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {RelatedProducts.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <h2 className="page-title text-lg sm:text-2xl">
            <i className="fa-solid fa-grid-2 mr-2 text-green-color"></i>Related Products
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {RelatedProducts.map(prod => (
              <ProductItem key={prod._id} prod={prod} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
