import StarRating from './StarRating.jsx';

export default function(props) {
  const product_info = props.product_info || {};
  const price = product_info.default_price ? `$${product_info.default_price}` : '';

  return (
    <div className="ov-product-info">
      <div className="ov-product-rating">
        <StarRating rating={props.rating} />
        <span className="ov-reviews-link">
          <a href="#">Read all reviews</a>
        </span>
      </div>
      <p className="ov-category">CATEGORY - {product_info.category && product_info.category.toUpperCase()}</p>
      <h2 className="ov-product-name">{product_info.name}</h2>
      <p className="ov-price">{price}</p>
    </div>
  );
}