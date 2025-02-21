import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import ProductItem from './ProductItem';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function ProductDetails() {



    let { data, mutate, error, isError, isSuccess } = useMutationCart(addToCart)

    if (isSuccess)
        toast.success(data?.data?.message)
    if (isError)
        toast.error(error?.response?.data?.message)


    let [RelatedProducts, setRelatedProducts] = useState([]);

    let [imgSrc, setImgSrc] = useState('')
    let [ind, setIndex] = useState(0)
    let { id, catId } = useParams()


    function chnageSrc(e) {
        setIndex(e.target.getAttribute('index'));
        setImgSrc(e.target.src);
    }

    async function getProductDetails() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }


    let { data:dataobj ,isLoading} = useQuery({ queryKey: ['productDetails',id],queryFn:getProductDetails ,
        select:(dataobj)=>dataobj?.data?.data
    })
    


    async function getRelatedProducts() {

        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`)
            setRelatedProducts(data.data);

        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getRelatedProducts()
    }, [])


    if(isLoading)
        return <Loading></Loading>

    return (
        <div className='container'>
            <div className='flex items-center gap-6'>
                <div className='w-1/3'>
                    <img src={imgSrc ? imgSrc : dataobj?.imageCover} className='w-full my-4' alt="" />
                    <div className='flex gap-2' >
                        {dataobj?.images?.map((img, index) => <img index={index} onClick={chnageSrc} src={img} className={`w-[20%] transition-all cursor-pointer ${index == ind ? 'border-4 border-red-400 opacity-100 scale-95' : 'opacity-55'} `} key={img} />)}
                    </div>
                </div>
                <div className='w-2/3'>
                    <h2 className='text-[2rem] font-bold my-4'>{dataobj?.title}</h2>
                    <p>{dataobj?.description}</p>
                    <div className='flex justify-between'>
                        <div>
                            <h3 className='font-semibold text-sm'>{dataobj?.category?.name}</h3>
                        </div>
                        <div>
                            <span>{dataobj?.ratingsAverage} <i className='fa-solid fa-star text-rating-color'></i></span>
                            <p>{dataobj?.price} EGP</p>
                        </div>
                    </div>
                    <button className='btn w-full block py-3 text-white my-3 bg-green-400' onClick={() => { mutate(dataobj?._id) }}>add to cart</button>
                </div>
            </div>

            <h2 className='my-5 text-[2rem] font-bold'>Reltaed products</h2>

            <div className='row'>
                <div className='flex flex-wrap'>
                    {RelatedProducts.length ? RelatedProducts.map(prod => <ProductItem key={prod._id} prod={prod}></ProductItem>) : <Loading></Loading>}
                </div>
            </div>
        </div>
    )
}
