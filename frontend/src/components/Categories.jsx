export default function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <div>
      <select
        id="categorySelect"
        className="form-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          width: "300px", // Fixed width
          height: "35px",
          fontSize: "16px",
          padding: "5px 10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <option value="" disabled>
          Select a category
        </option>
        <option value="Cakes">Cakes</option>
        <option value="Ice Creams">Ice Creams</option>
        <option value="Food">Food</option>
        <option value="Drinks">Drinks</option>
        <option value="Pizza">Pizza</option>
      </select>
    </div>
  );
}
