import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductListing from "./pages/ProductListing";
import CartPage from "./pages/CartPage";
import { selectCartSummary } from "./store/slices/cartSlice";
import "./styles/App.css";

/**
 * App - Root component
 * Simple single-page application with view switching between Products and Cart
 * No routing library used to keep dependencies minimal per assignment requirements
 */
const App = () => {
  const [activeView, setActiveView] = useState("products");
  const { itemCount } = useSelector(selectCartSummary);

  return (
    <div className="app">
      <header className="simple-header">
        <h1 className="simple-title">Naksh Jewels</h1>
        <nav className="simple-nav">
          <button
            type="button"
            className={`nav-btn ${activeView === "products" ? "active" : ""}`}
            onClick={() => setActiveView("products")}
          >
            Products
          </button>
          <button
            type="button"
            className={`nav-btn ${activeView === "cart" ? "active" : ""}`}
            onClick={() => setActiveView("cart")}
          >
            Cart {itemCount > 0 && `(${itemCount})`}
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeView === "products" ? (
          <ProductListing />
        ) : (
          <CartPage onBackToProducts={() => setActiveView("products")} />
        )}
      </main>
    </div>
  );
};

export default App;
