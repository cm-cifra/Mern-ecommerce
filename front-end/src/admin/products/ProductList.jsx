import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../App";
import { Link } from "react-router-dom";
import Product from "../components/productComponents";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VITE_BACKEND_URL}/product`); // Ensure correct API endpoint
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div>
        <Link
          to="/createProduct"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600"
        >
          Create a product
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 mt-5">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            {products.length > 0 ? (
              products.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  getProducts={getProducts}
                />
              ))
            ) : (
              <div>There are no products available</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
