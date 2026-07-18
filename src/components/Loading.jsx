import React from 'react'

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-gray-200"></div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-green-color border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  )
}
