
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import useProducts from "../hooks/useProducts";
import AIAssistant from "../components/AIAssistant";

function Admin() {
  const { products, loading, error } = useProducts();

  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  // Load the latest products after changes
  const [productList, setProductList] = useState(null);

  const displayedProducts = productList ?? products;

  async function reloadProducts() {
    const response = await fetch("http://localhost:6001/products");

    if (!response.ok) {
      throw new Error("Could not reload products");
    }

    const data = await response.json();
    setProductList(data);
    setRefresh((previous) => previous + 1);
  }

  // CREATE - POST
  async function addProduct(newProduct) {
    try {
      const response = await fetch("http://localhost:6001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      await reloadProducts();
      setMessage("Product added successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  // UPDATE - PATCH
  async function updateProduct(id) {
    try {
      const response = await fetch(
        `http://localhost:6001/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            price: Number(editPrice),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      await reloadProducts();
      setEditingId(null);
      setMessage("Product updated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  // DELETE
  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:6001/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      await reloadProducts();
      setMessage("Product deleted successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  }

  function startEditing(product) {
    setEditingId(product.id);
    setEditPrice(product.price);
  }

async function updateProductImage(id, file) {
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    setMessage("Please choose a JPG, PNG, or WebP image.");
    return;
  }

  if (file.size > 1024 * 1024) {
    setMessage("Image must be smaller than 1 MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = async () => {
    try {
      const response = await fetch(
        `http://localhost:6001/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image: reader.result,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update picture");
      }

      await reloadProducts();
      setMessage("Product picture updated successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  reader.onerror = () => {
    setMessage("Could not read the selected picture.");
  };

  reader.readAsDataURL(file);
}

async function removeProductImage(id) {
  try {
    const response = await fetch(
      `http://localhost:6001/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: "" }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove picture");
    }

    await reloadProducts();
    setMessage("Product picture removed!");
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
}

  return (
    <section className="admin">
      <h1>Admin Portal</h1>
      <p>Manage your Models3go products.</p>

      {message && <p className="admin-message">{message}</p>}
      {error && <p>Error: {error}</p>}

      <ProductForm onAddProduct={addProduct} />
      <AIAssistant />

      <h2 className="admin-products-title">Manage Products</h2>

      {loading && <p>Loading products...</p>}

      <div className="admin-product-list">
        {displayedProducts.map((product) => (
          <div className="admin-product" key={product.id}>
            <div>
              <h3>{product.name}</h3>
              <p>{product.material} | Stock: {product.stock}</p>
              <strong>${Number(product.price).toFixed(2)}</strong>
            </div>
            
<div className="admin-image-controls">
  <label className="image-upload-button">
    {product.image ? "Replace Picture" : "Upload Picture"}

    <input
      type="file"
      accept="image/png,image/jpeg,image/webp"
      hidden
      onChange={(event) => {
        updateProductImage(
          product.id,
          event.target.files[0]
        );
        event.target.value = "";
      }}
    />
  </label>

  {product.image && (
    <button
      className="remove-image-button"
      onClick={() => removeProductImage(product.id)}
    >
      Remove Picture
    </button>
  )}
</div>

            <div className="admin-actions">
              {editingId === product.id ? (
                <>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={editPrice}
                    onChange={(event) =>
                      setEditPrice(event.target.value)
                    }
                  />

                  <button
                    onClick={() => updateProduct(product.id)}
                    className="save-button"
                  >
                    Save
                  </button>

                  <button onClick={() => setEditingId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditing(product)}>
                    Edit Price
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Admin;
