import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await getProductById(parseInt(id));
        setProduct(data);
        setError('');
      } catch (err) {
        console.error(`Error fetching product ${id}:`, err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      // alert message 
      alert('Product added to cart!');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return <div className="product-detail-loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="product-detail-error">{error}</div>;
  }

  if (!product) {
    return <div className="product-detail-error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        &larr; Back
      </button>
      
      <div className="product-detail">
        <div className="product-detail-img-container">
          <img src={product.image} alt={product.title} className="product-detail-img" />
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-category">
            Category: <span>{product.category}</span>
          </div>
          
          <div className="product-detail-price">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="product-detail-description">
            {product.description}
          </p>
          
          <div className="product-detail-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-input-group">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
