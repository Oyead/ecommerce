import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './Loading'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(response.data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (isLoading) return <Loading />
  if (error) return <div className="container py-16 empty-state"><p className="text-red-500">Error: {error}</p></div>

  return (
    <div className="container py-6 sm:py-8">
      <h1 className="page-title text-xl sm:text-2xl">
        <i className="fa-solid fa-grid-2 mr-2 text-green-color"></i>Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((category) => (
          <div key={category._id} className="card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden text-center p-4">
            <div className="bg-gray-50 rounded-xl mb-4 overflow-hidden">
              <img src={category.image} alt={category.name} className="w-full h-44 object-contain p-2" />
            </div>
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
