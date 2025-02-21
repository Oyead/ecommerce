import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(response.data.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category._id} className="bg-white rounded-lg shadow-md p-4 text-center">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-contain mb-2"
            />
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
