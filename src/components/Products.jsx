import React, { useState } from 'react';
import ProductItem from './ProductItem';
import Loading from './Loading';
import useProduct from '../hooks/useProduct';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isError, isLoading, error } = useProduct();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const filteredProducts = data?.filter((prod) => 
    prod?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <Loading />;

  if (isError) return <h2>{error?.message || 'An error occurred'}</h2>;

  return (
    <div className="container">

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search products by title..."
          className="border p-2 rounded w-full pr-10" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={handleClearSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M11.742 12.742a1 1 0 0 1-1.414 0L8 9.414 5.672 12.742a1 1 0 0 1-1.414-1.414L6.586 8 3.328 4.742a1 1 0 0 1 1.414-1.414L8 6.586l2.328-2.328a1 1 0 0 1 1.414 1.414L9.414 8l3.328 3.328a1 1 0 0 1 0 1.414z"/>
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap">
        {filteredProducts?.map((prod) => (
          <ProductItem key={prod?._id} prod={prod} />
        ))}
        {filteredProducts?.length === 0 && (
          <p>No products match your search.</p>
        )}
      </div>
    </div>
  );
}
