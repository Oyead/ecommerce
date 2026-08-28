import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import useMutationWishlist, { AddtoWishlist, RemoveItem } from '../hooks/useMutationWishlist';
import toast from 'react-hot-toast';

export default function ProductItem({ prod }) {
  const [isLiked, setIsLiked] = useState(false);
  let { imageCover, _id: id, title, price, category, ratingsAverage, priceAfterDiscount } = prod;

  let { data: cartData, mutate: mutateCart, error: cartError, isError: isCartError, isSuccess: isCartSuccess } = useMutationCart(addToCart);
  let { mutate: mutateWishlist } = useMutationWishlist(isLiked ? RemoveItem : AddtoWishlist);

  if (isCartSuccess) toast.success(cartData?.data?.message);
  if (isCartError) toast.error(cartError?.response?.data?.message);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="product bg-white rounded-2xl border border-gray-100 overflow-hidden w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-3">
      <Link to={`/productdetails}/${id}/${category._id}`} className="block">
        <div className="relative overflow-hidden rounded-xl mb-3">
          <img src={imageCover} className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 hover:scale-105" alt={title} />
          {priceAfterDiscount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg">
              Sale
            </span>
          )}
          <button
            onClick={handleLikeClick}
            className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all duration-200"
          >
            <i className={`fa-solid fa-heart text-sm ${isLiked ? 'text-red-500' : 'text-gray-400'}`}></i>
          </button>
        </div>

        <div className="space-y-1.5">
          <span className="badge-green text-[10px]">{category.name}</span>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1">{title}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {priceAfterDiscount ? (
                <>
                  <span className="text-green-color font-bold text-xs sm:text-sm">{priceAfterDiscount} EGP</span>
                  <span className="text-gray-400 text-[10px] sm:text-xs line-through">{price} EGP</span>
                </>
              ) : (
                <span className="text-gray-800 font-bold text-xs sm:text-sm">{price} EGP</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs sm:text-sm font-medium text-gray-700">{ratingsAverage}</span>
              <i className="fa-solid fa-star text-rating-color text-[10px] sm:text-xs"></i>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            mutateCart(id);
          }}
          className="w-full bg-green-color hover:bg-green-700 text-white text-xs sm:text-sm font-medium py-2 sm:py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5"
        >
          <i className="fa-solid fa-cart-plus"></i>Add to Cart
        </button>
      </div>
    </div>
  );
}
