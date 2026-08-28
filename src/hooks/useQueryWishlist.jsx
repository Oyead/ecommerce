import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { api } from '../apis/client'

export function getWishlist() {
    return api.get(`/wishlist`)
}

export default function useQueryWishlist(fn) {


    return useQuery({queryKey:['wishlist'],queryFn:fn,
        refetchInterval:5000,
        refetchOnWindowFocus:false
    })

}
export function addToCart(productId) {
  return api.post(`/cart`, { productId })
}
