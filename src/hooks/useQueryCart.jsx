import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'


let token = localStorage.getItem('token')

export function getCarts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
            token
        }
    })
}

export default function useQueryCart(fn) {


    return useQuery({queryKey:['cart'],queryFn:fn,
        refetchInterval:5000,
        refetchOnWindowFocus:false
    })

}
