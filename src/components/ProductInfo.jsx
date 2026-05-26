import API from '../services/API.js';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart } from "../store/slices/cartSlice";
import { fetchProductById } from "../store/slices/productSlice";
import '../styles/ProductInfo.css';

const ProductInfo = () => {
    const { product, isLoading, error, id } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    // Check if the user has a token
    const isAuthenticated = !!API.getToken();

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    const handleAddToCart = () => {
        // Prevent action if not logged in or out of stock
        if (!product || !isAuthenticated || product.stock <= 0) return;
        
        const quantity = 1;
        dispatch(AddToCart({ productId: product.id, quantity }));
    };

    // 1. Handle loading state
    if (isLoading) {
        return <div>Product is loading...</div>;
    }

    // 2. Handle error state
    if (error) {
        return <div>An error occurred while loading product.</div>;
    }

    // 3. If product is null (e.g., initial state or invalid ID), don't render anything
    if (!product) {
        return null;
    }

    // 4. Calculate imageSource ONLY after we confirm product exists
    const imageSource = product.imagePath 
        ? `${API.baseURL}${product.imagePath}` 
        : '/noImage.png';

    return (
        <div className="product-info-container">
            <div>
                <div className="product-image">
                    <img src={imageSource} height="200" alt={product.name || "Product image"}/>
                    </div>
                    <div className="product-details">
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    </div>
                </div>
            <div className="product-purchase">
                <p className="product-price">{product.price} PLN</p>
                <p className="product-stock">In stock: {product.stock} pcs</p>
                
                <button 
                    className="add-to-cart-btn" 
                    onClick={handleAddToCart}
                    // Disable if out of stock OR not logged in
                    disabled={product.stock <= 0 || !isAuthenticated}
                >
                    {!isAuthenticated 
                        ? "Log in to add to cart" 
                        : (product.stock > 0 ? "Add to Cart" : "Out of Stock")}
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;