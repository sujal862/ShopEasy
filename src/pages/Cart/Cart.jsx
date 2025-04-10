import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";
import Modal from "../../components/Modal/Modal";
import "./Cart.css";

const Cart = () => {
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    setIsModalOpen(true);

    // Clear cart + close modal after 4s
    setTimeout(() => {
      clearCart();
      setIsModalOpen(false);
    }, 4000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      <div className="cart-content">

        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            
            <span>Items ({cartItems.length}):</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>

          <button className="checkout-button" 
          onClick={handleCheckout}>
            Checkout
          </button>

          <Link to="/" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h2>Order placed successfully!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
