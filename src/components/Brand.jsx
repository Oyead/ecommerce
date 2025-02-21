import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchBrands = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
        setBrands(response.data.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands.map((brand) => (
          <div key={brand._id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <img
              src={brand.image}
              alt={brand.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-lg font-semibold">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
