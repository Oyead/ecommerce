
import ProductItem from './ProductItem'
import Loading from './Loading';
import useProduct from '../hooks/useProduct';
export default function FeaturedProducts() {


    let { data, isError, isLoading, error } = useProduct()

    if (isLoading)
        return <Loading></Loading>

    if (isError)
        return <h2>{error.message}</h2>


    return (
        <div className='container'>
            <div className='flex flex-wrap'>
                {data?.map(prod => <ProductItem key={prod?._id} prod={prod}></ProductItem>)}
            </div>
        </div>
    )
}
