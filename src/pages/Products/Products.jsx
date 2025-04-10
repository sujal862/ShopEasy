import { useState, useEffect } from 'react';
import { getProducts, getCategories, getProductsByCategory } from '../../services/api';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');


  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const productsData = await getProducts();
        setProducts(productsData);

        setError('');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  // Fetch products by category when category changes
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setIsLoading(true);

        // If empty string (All Categories) or 'all' is present, fetch all products
        if (!selectedCategory || selectedCategory === 'all') {
          const productsData = await getProducts();
          setProducts(productsData);
        } else {
          // else fetch by category
          const productsData = await getProductsByCategory(selectedCategory);
          setProducts(productsData);
        }

        setError('');
      } catch (err) {
        console.error(`Error fetching products:`, err);
        setError(selectedCategory
          ? `Failed to load products in ${selectedCategory} category.`
          : 'Failed to load products.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [selectedCategory]);

  // Filter products by search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">Our Products</h1>

        <div className="filters">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="category-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          No products found. Try a different search or category.
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
