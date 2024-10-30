import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderPage from "./headerpage";
import FooterPage from "./footerpage";
import { VITE_BACKEND_URL } from "../App";

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${VITE_BACKEND_URL}/product`),
          axios.get(`${VITE_BACKEND_URL}/category`),
        ]);
        setProducts(productRes.data);
        setCategories(categoryRes.data);
        setFilteredProducts(productRes.data);

        if (productRes.data.length > 0) {
          setMainImage(productRes.data[0].images[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter(
        (product) => product.categoryID.title === selectedCategory
      );
    }

    if (searchQuery) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage("");
  };

  return (
    <div className="bg-blue-100">
      <HeaderPage
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <section className="bg-light-blue-200 py-10 rounded-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg">
            <div className="relative rounded-sm">
              <img
                src={`${VITE_BACKEND_URL}${mainImage}`}
                className="w-full h-96 object-cover rounded-xl"
                alt="Main product"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-2">
                    Check Out Today's Flash Sale
                  </h2>
                  <p className="text-md">
                    Get ready for an electrifying shopping experience!
                  </p>
                  <button className="mt-4 bg-blue-400 text-white px-6 py-3 rounded-lg">
                    Shop The Sale
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 shadow-md flex justify-between items-center rounded-lg h-52">
                <div>
                  <h3 className="text-xl font-bold">Summer Wear</h3>
                  <p className="text-blue-950">$209.00</p>
                </div>
                <img
                  src={`${VITE_BACKEND_URL}${mainImage}`}
                  className="w-24 h-24 object-cover cursor-pointer"
                  alt="Summer Wear"
                  onClick={() => handleImageClick(mainImage)}
                />
              </div>
              <div className="bg-white p-4 shadow-md flex justify-between items-center rounded-lg h-52">
                <div>
                  <h3 className="text-xl font-bold">Sweaters</h3>
                  <p className="text-blue-950">$209.00</p>
                </div>
                <img
                  src={`${VITE_BACKEND_URL}${mainImage}`}
                  className="w-24 h-24 object-cover cursor-pointer"
                  alt="Sweaters"
                  onClick={() => handleImageClick(mainImage)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-300 shadow-md py-6">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <img
              src="https://cdn-icons-png.freepik.com/256/5371/5371883.png"
              alt="Free Shipping"
              className="mx-auto mb-2 w-12"
            />
            <p className="font-bold">Free Shipping</p>
            <p>From all orders over $100</p>
          </div>
          <div>
            <img
              src="https://cdn-icons-png.freepik.com/256/5601/5601511.png"
              alt="Secure Payments"
              className="mx-auto mb-2 w-12"
            />
            <p className="font-bold">Secure Payments</p>
            <p>With 5+ payment options</p>
          </div>
          <div>
            <img
              src="https://cdn-icons-png.freepik.com/256/1585/1585197.png"
              alt="30 Days Free Return"
              className="mx-auto mb-2 w-12"
            />
            <p className="font-bold">30 Days Free Return</p>
            <p>No questions asked</p>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Our Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 shadow-lg rounded-lg"
                >
                  <img
                    src={`${VITE_BACKEND_URL}${product.images[0]}`}
                    className="w-full h-32 object-cover"
                    alt={product.title}
                    onClick={() => handleImageClick(product.images[0])}
                  />
                  <h3
                    className="mt-2 text-lg md:text-xl font-bold overflow-hidden whitespace-nowrap text-ellipsis"
                    style={{ height: "24px" }}
                  >
                    {product.title}
                  </h3>

                  <div className="text-xs sm:text-xs mb-4">
                    Price: ${product.price.toFixed(2)}
                  </div>

                  <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg ">
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        </div>
      </section>

      <FooterPage />

      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={`${VITE_BACKEND_URL}${selectedImage}`}
              className="max-w-full max-h-full rounded-lg"
              alt="Full Size"
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeImage}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
