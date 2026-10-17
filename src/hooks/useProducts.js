
import { useEffect, useState } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

export default useProducts;
