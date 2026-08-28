export const PRODUCT_API = 'https://ecommerce.routemisr.com/api/v1'

export async function fetchProduct(productId) {
  const res = await fetch(`${PRODUCT_API}/products/${productId}`)
  if (!res.ok) throw new Error('Product not found')
  const json = await res.json()
  return json.data
}
