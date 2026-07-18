import React, { useState } from 'react'
import ProductItem from './Productitem'
import Loading from './Loading'
import useProduct from '../hooks/useProduct'

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, isError, isLoading, error } = useProduct()

  const handleSearchChange = (e) => setSearchQuery(e.target.value)
  const handleClearSearch = () => setSearchQuery('')

  const filteredProducts = data?.filter((prod) =>
    prod?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) return <Loading />
  if (isError) return <div className="container py-16 empty-state"><p className="text-red-500">{error?.message || 'An error occurred'}</p></div>

  return (
    <div className="container py-6 sm:py-8 px-4">
      <h1 className="page-title text-xl sm:text-2xl">
        <i className="fa-solid fa-bag-shopping mr-2 text-green-color"></i>All Products
        <span className="text-xs sm:text-sm font-normal text-gray-500 ml-2">({filteredProducts?.length || 0} items)</span>
      </h1>

      <div className="mb-6 sm:mb-8 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
        </div>
        <input
          type="text"
          placeholder="Search products by title..."
          className="input-field pl-11 pr-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            onClick={handleClearSearch}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-4">
        {filteredProducts?.map((prod) => (
          <ProductItem key={prod?._id} prod={prod} />
        ))}
      </div>

      {filteredProducts?.length === 0 && (
        <div className="empty-state py-12 sm:py-16">
          <i className="fa-solid fa-magnifying-glass text-4xl sm:text-5xl text-gray-300 mb-4"></i>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">No products found</h2>
          <p className="text-gray-500 text-sm">Try a different search term</p>
        </div>
      )}
    </div>
  )
}
