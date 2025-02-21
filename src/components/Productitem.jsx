import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import useMutationWishlist, { AddtoWishlist, RemoveItem } from '../hooks/useMutationWishlist'; 
import toast from 'react-hot-toast';

export default function ProductItem({ prod }) {
  const [isLiked, setIsLiked] = useState(false);
  let { imageCover, id, title, price, category, ratingsAverage, priceAfterDiscount } = prod;


  let { data: cartData, mutate: mutateCart, error: cartError, isError: isCartError, isSuccess: isCartSuccess } = useMutationCart(addToCart);


  let { mutate: mutateWishlist } = useMutationWishlist(isLiked ? RemoveItem : AddtoWishlist);


  if (isCartSuccess) toast.success(cartData?.data?.message);
  if (isCartError) toast.error(cartError?.response?.data?.message);

  const handleLikeClick = () => {
    mutateWishlist(id, {
      onSuccess: () => {
        setIsLiked(!isLiked); 
        toast.success(isLiked ? 'Removed from wishlist' : 'Added to wishlist');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update wishlist');
      },
    });
  };

  return (
    <div className='product cursor-pointer lg:w-1/6 md:w-1/4 sm:w-1/6 w-full p-4'>
      <Link to={`/productdetails/${id}/${category._id}`}>
        <img src={imageCover} className='w-full' alt="" />
        <p className='text-green-color text-sm font-bold'>{category.name}</p>
        <p>{title}</p>
        <div className='flex justify-between my-3'>
          <div>
            <p className={priceAfterDiscount ? 'line-through' : ''}>{price} EGP</p>
            <p>{priceAfterDiscount ? priceAfterDiscount + ' EGP' : ''}</p>
          </div>
          <div>
            <span>{ratingsAverage}
              <i className='fa-solid fa-star text-rating-color'></i>
            </span>
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-center">
        <button onClick={() => { mutateCart(id) }} className="btn bg-green-400 text-white px-5 py-3 rounded">
          Add to Cart
        </button>

        <button onClick={handleLikeClick} className="text-xl">
          <i className={`fa-solid fa-heart ${isLiked ? 'text-red-500' : 'text-gray-500'}`}></i>
        </button>
      </div>
    </div>
  );
}