import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { api } from '../apis/client'

//add to cart
export function addToCart(productId) {
    return api.post(`/cart`, { productId })
}

//delete item from cart
export function deleteItem(productId) {
    return api.delete(`/cart/${productId}`)
}
//clear item from cart
export function clearCart() {
    return api.delete(`/cart/`)
}
//update 
export function updateCount({ productId, count }) {
    return api.put(`/cart/${productId}`, { count })
}

export default function useMutationCart(fn) {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fn, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] })
        }
    })

}
