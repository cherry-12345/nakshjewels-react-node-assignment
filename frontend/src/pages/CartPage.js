import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../store/slices/cartSlice";
import CartItem from "../components/CartItem";
import "../styles/CartPage.css";

const CartPage = ({ onBackToProducts }) => {
  const cartItems = useSelector(selectCartItems);

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h2>Cart</h2>
        <p>Your cart is empty</p>
        <button onClick={onBackToProducts}>Back to Products</button>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <h2>Cart</h2>
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CartPage;
