import API from '../services/API.js'; // Adjust the '../' dots if your folder structure is different
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css'
import { useDispatch } from 'react-redux';
import { setId } from '../store/slices/productSlice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function HandleClick() {
    dispatch(setId(product.id));
    navigate(`/product/${product.id}`);
  };

  // Determine the image source
  // If imagePath exists, use it; otherwise, use the default image
  const imageSource = product.imagePath 
    ? `${API.baseURL}${product.imagePath}` 
    : '/noImage.png'; // Ensure noimage.png is in your 'public' folder

  return (
    <div className="product-card" onClick={HandleClick}>
      <img src={imageSource} height="100" alt={product.name || "Product image"} />
      <h2>{product.name}</h2>
      <div>{product.description}</div>
      <div>Price: {product.price} PLN</div>
    </div>
  );
};

export default ProductCard;