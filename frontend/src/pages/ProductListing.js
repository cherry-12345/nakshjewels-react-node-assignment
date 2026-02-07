import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProducts } from "../store/slices/productSlice";
import ProductCard from "../components/ProductCard";
import "../styles/ProductListing.css";

const ProductListing = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) return <div className="page-status">Loading...</div>;
  if (error) return <div className="page-status">Error: {error}</div>;

  return (
    <section className="product-listing">
      <h2>Products</h2>
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductListing;
