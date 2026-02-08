import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartSummary } from "../store/slices/cartSlice";
import CartItem from "../components/CartItem";
import "../styles/CartPage.css";

/**
 * CartPage - Displays shopping cart with items and totals
 * Shows empty state when cart has no items
 */
const CartPage = ({ onBackToProducts }) => {
  const cartItems = useSelector(selectCartItems);
  const { itemCount, total } = useSelector(selectCartSummary);

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h2>Cart</h2>
        <div className="empty-cart">
          <p className="empty-cart-text">Your cart is empty</p>
          <button className="continue-shopping-btn" onClick={onBackToProducts}>
            Back to Products
          </button>
        </div>
      </section>
    );
  }

  // Cart with items
  return (
    <section className="cart-page">
      <h2>Cart</h2>
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span className="summary-label">Items:</span>
          <span className="summary-value">{itemCount}</span>
        </div>
        <div className="summary-row summary-total">
          <span className="summary-label">Total:</span>
          <span className="summary-value">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
