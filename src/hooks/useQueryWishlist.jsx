import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


let token = localStorage.getItem('token')

export function getWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
            token
        }
    })
}

export default function useQueryWishlist(fn) {


    return useQuery({queryKey:['wishlist'],queryFn:fn,
        refetchInterval:5000,
        refetchOnWindowFocus:false
    })

}
export function addToCart(productId) {
  return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
      headers: {
          token
      }
  })
}