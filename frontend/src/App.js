import React, { useState } from "react";
import ProductListing from "./pages/ProductListing";
import CartPage from "./pages/CartPage";
import "./styles/App.css";

const App = () => {
  const [activeView, setActiveView] = useState("products");

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
            Cart
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
