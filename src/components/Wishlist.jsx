import React from 'react';
import useQueryWishlist, { getWishlist } from '../hooks/useQueryWishlist';
import useMutationWishlist, { RemoveItem } from '../hooks/useMutationWishlist';
import useMutationCart, { addToCart } from '../hooks/useMutationCart';
import Loading from './Loading';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const { data, isLoading, isError, error, refetch } = useQueryWishlist(getWishlist);
  const { mutate: mutateRemove } = useMutationWishlist(RemoveItem);
  const { mutate: mutateCart } = useMutationCart(addToCart);

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  const handleAddToCart = (productId) => {
    mutateCart(productId, {
      onSuccess: () => {
        mutateRemove(productId, {
          onSuccess: () => {
            toast.success('Item moved to cart');
            refetch();
          },
          onError: (error) => {
            toast.error('Failed to remove from wishlist');
          },
        });
      },
      onError: (error) => {
        toast.error('Failed to add to cart');
      },
    });
  };

  return (
    <div className="w-3/4 mx-auto my-5 relative overflow-x-auto sm:rounded-lg">
      <h1 className="font-bold my-10">Wishlist</h1>
      <table className="shadow-lg w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.map((item) => (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.price} EGP
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => mutateRemove(item.id)}
                  className="font-medium text-white rounded bg-red-400 p-4 dark:text-red-500 hover:underline"
                >
                  Remove <i className="fa-solid fa-trash"></i>
                </button>
                <button
                  onClick={() => handleAddToCart(item.id)}
                  className="btn bg-green-400 text-white px-5 py-3 rounded ml-2"
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}