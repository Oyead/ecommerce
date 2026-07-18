import ProductItem from './Productitem'
import Loading from './Loading'
import useProduct from '../hooks/useProduct'

export default function FeaturedProducts() {
  let { data, isError, isLoading, error } = useProduct()

  if (isLoading) return <Loading />
  if (isError) return <div className="container py-16 empty-state"><p className="text-red-500">{error.message}</p></div>

  return (
    <div className="container py-4 sm:py-6">
      <h2 className="page-title text-xl sm:text-2xl">
        <i className="fa-solid fa-fire mr-2 text-green-color"></i>Featured Products
      </h2>
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {data?.map(prod => <ProductItem key={prod?._id} prod={prod} />)}
      </div>
    </div>
  )
}
