
import { useState } from "react";
import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

function Shop() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="shop">
      <h1>Shop 3D-Printed Products</h1>
      <p>Explore our collection of practical 3D-printed designs.</p>

      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Shop;
