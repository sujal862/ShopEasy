import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price, image, category } = product;

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    addToCart(product);
  };

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="product-img-container">
        <img src={image} alt={title} className="product-img" />
        <span className="product-category">{category}</span>
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
