import React from "react";

const Categories = ({ categories, category, setCategory }) => {
  return (
    <div className="categories">
      {categories.map((cat) => (
        <label>
          <input
            type="radio"
            value={cat}
            name={cat}
            checked={category === cat}
            onClick={(e) => setCategory(e.target.value)}
          />
          {cat}
        </label>
      ))}
    </div>
  );
};

export default Categories;
