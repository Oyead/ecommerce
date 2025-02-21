import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


let token = localStorage.getItem('token')

//add to cart
export function addToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, {
        headers: {
            token
        }
    })
}

//delete item from cart
export function deleteItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
            token
        }
    })
}
//clear item from cart
export function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        headers: {
            token
        }
    })
}
//update 
export function updateCount({ productId, count }) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }, {
        headers: {
            token
        }
    })
}

export default function useMutationCart(fn) {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fn, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
    })

}
