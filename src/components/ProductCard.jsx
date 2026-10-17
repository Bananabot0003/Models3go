
function ProductCard({ product }) {
  return (
    <div className="product-card">
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
      ) : (
        <div className="product-placeholder">
          <span>⬡</span>
        </div>
      )}

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Material: {product.material}</p>
      <p>In stock: {product.stock}</p>
      <strong>${Number(product.price).toFixed(2)}</strong>
    </div>
  );
}

export default ProductCard;
