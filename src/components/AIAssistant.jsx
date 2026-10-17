
import { useState } from "react";

function AIAssistant() {
  const [productIdea, setProductIdea] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateDescription() {
    if (!productIdea.trim()) {
      setError("Please enter a product idea.");
      return;
    }

    setLoading(true);
    setError("");
    setDescription("");

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2",
          prompt: `Write a short, professional e-commerce product description for this 3D-printed product: ${productIdea}. Keep it under 80 words. Do not invent product features.`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Could not connect to Ollama.");
      }

      const data = await response.json();
      setDescription(data.response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="ai-assistant">
      <h2>AI Product Description Generator</h2>
      <p>
        Enter a product idea and let AI write a description.
      </p>

      <textarea
        placeholder="Example: 3D-printed PETG headphone stand"
        value={productIdea}
        onChange={(event) => setProductIdea(event.target.value)}
      />

      <button
        className="primary-button"
        onClick={generateDescription}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Description"}
      </button>

      {error && <p className="ai-error">{error}</p>}

      {description && (
        <div className="ai-result">
          <h3>Generated Description</h3>
          <p>{description}</p>
        </div>
      )}
    </section>
  );
}

export default AIAssistant;
