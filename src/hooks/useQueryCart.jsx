import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { api } from '../apis/client'

export function getCarts() {
    return api.get(`/cart`)
}

export default function useQueryCart(fn) {


    return useQuery({queryKey:['cart'],queryFn:fn,
        refetchInterval:5000,
        refetchOnWindowFocus:false
    })

}
