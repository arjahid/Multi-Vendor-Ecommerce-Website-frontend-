import React, { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3100/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
  },[])
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Categories ({categories.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <NavLink
            key={category.id}
            to={`/products/${encodeURIComponent(category.category)}`}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer hover:bg-gray-50 block text-decoration-none"
          >
            <span className="text-lg font-medium text-gray-700">{category.category}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Category;