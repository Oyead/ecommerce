import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../apis/client'

export function AddtoWishlist(productId){
  return api.post(`/wishlist`, { productId })
}

export function RemoveItem(productId){
  return api.delete(`/wishlist/${productId}`)
}

export default function useMutationWis(fn) {

  const queryClient = useQueryClient()

  return useMutation({
      mutationFn: fn, onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      }
  })

}
