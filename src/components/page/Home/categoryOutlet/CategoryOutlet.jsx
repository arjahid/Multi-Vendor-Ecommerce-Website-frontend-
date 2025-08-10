import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const CategoryOutlet = () => {

    const [products,setProducts]=useState([]);
    const [loading, setLoading] = useState(true);
    
    const {category}=useParams();

    useEffect(()=>{
        fetch(`http://localhost:3100/products/${category}`)
          .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
          .catch(error => {
            console.error("Error fetching products:", error);
            setLoading(false);
          });
    },[category]);
    console.log('Products:', products);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div className="product-list">
      <h2>Products in {category}</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        products.map(product => (
          <div key={product.productId} className="product-item">
            <h3>{product.productName}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
          </div>
        ))
      )}
    </div>
    );
};

export default CategoryOutlet;
