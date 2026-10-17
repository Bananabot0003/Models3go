
import { useState } from "react";

function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    material: "PLA",
    price: "",
    stock: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Please enter a product name and price.");
      return;
    }

    const newProduct = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    onAddProduct(newProduct);

    setFormData({
      name: "",
      description: "",
      category: "",
      material: "PLA",
      price: "",
      stock: "",
    });
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <select
        name="material"
        value={formData.material}
        onChange={handleChange}
      >
        <option value="PLA">PLA</option>
        <option value="PETG">PETG</option>
        <option value="ABS">ABS</option>
        <option value="TPU">TPU</option>
      </select>

      <input
        name="price"
        type="number"
        step="0.01"
        min="0"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <input
        name="stock"
        type="number"
        min="0"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
      />

      <button type="submit" className="primary-button">
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
