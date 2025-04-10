import { useCart } from '../../context/CartContext';
import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, title, price, image, quantity } = item;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img-container">
        <img src={image} alt={title} className="cart-item-img" />
      </div>
      
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <p className="cart-item-price">${price.toFixed(2)}</p>
        
        <div className="cart-item-actions">
          <div className="quantity-control">
            <button 
              className="quantity-btn"
              onClick={() => updateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
            <button 
              className="quantity-btn"
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button className="remove-btn" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
      
      <div className="cart-item-subtotal">
        <span className="subtotal-label">Subtotal:</span>
        <span className="subtotal-amount">${(price * quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartItem;
