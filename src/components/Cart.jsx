import React, { useContext, useState } from "react";
import useQueryCart, { getCarts } from "../hooks/useQueryCart";
import useMutationCart, { clearCart, deleteItem, updateCount } from "../hooks/useMutationCart";
import img from "/public/assets/images/empty.png";
import Loading from "./Loading";
import Payemnt from "./Payemnt";
import { numItem } from "../Context/NumcartContext";

export default function Cart() {
  const { cartNum, setCartNums } = useContext(numItem);
  const { data, isError, error, isLoading } = useQueryCart(getCarts);
  const { mutate, isPending } = useMutationCart(deleteItem);
  const { mutate: mutateClear, isPending: ispindingClear } = useMutationCart(clearCart);
  const { mutate: mutateupdate, isPending: ispindingupdate } = useMutationCart(updateCount);
  const [isOpen, setOpen] = useState(false);


  if (typeof setCartNums !== "function") {
    console.error("setCartNums is not a function. Check your context provider.");
    return null; 
  }

  if (!data?.data?.numOfCartItems) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={img} alt="" />
      </div>
    );
  }

  // Update the context value
  setCartNums(data.data.numOfCartItems);

  if (isLoading || isPending || ispindingClear || ispindingupdate) {
    return <Loading />;
  }

  return (
    <div className="w-3/4 mx-auto my-5 relative overflow-x-auto sm:rounded-lg">
      <h1 className="font-bold my-10">Number of Cart Item: {data?.data?.numOfCartItems}</h1>
      <h1 className="font-bold my-4">
        Total Price: <span className="text-green-color font-extrabold">{data?.data?.data?.totalCartPrice}</span> EGP
      </h1>
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
              Qty
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
          {data?.data?.data?.products.map((prod) => (
            <tr key={prod?.product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={prod?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      mutateupdate({ productId: prod?.product?._id, count: prod?.count - 1 });
                    }}
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <input
                      type="number"
                      id="first_product"
                      className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={prod?.count}
                      required
                    />
                  </div>
                  <button
                    onClick={() => {
                      mutateupdate({ productId: prod?.product?._id, count: prod?.count + 1 });
                    }}
                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    type="button"
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prod?.price} EGP
              </td>
              <td className="px-6 py-4">
                <a
                  onClick={() => {
                    mutate(prod?.product?._id);
                  }}
                  className="font-medium text-white rounded bg-red-400 p-4 dark:text-red-500 hover:underline"
                >
                  Remove <i className="fa-solid fa-trash"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bg-green-color p-4 my-10 float-right cursor-pointer" onClick={mutateClear}>
        Clear Cart
      </button>
      <br />
      <br />
      <button
        onClick={() => {
          setOpen(!isOpen);
        }}
        className="bg-green-color p-4 my-10 cursor-pointer"
      >
        Pay Online
      </button>
      {isOpen && <Payemnt cartId={data?.data?.cartId} />}
    </div>
  );
}