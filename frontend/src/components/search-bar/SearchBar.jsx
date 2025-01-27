import React, { useState } from "react";

import "./searchBar.scss";

function SearchBar({ onSearch }) {
  const [storeName, setStoreName] = useState("");
  const [storeCategory, setStoreCategory] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(storeName, storeCategory);
  };
  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="store-name"
          placeholder="Store name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
        <select
          name="store-category"
          value={storeCategory}
          onChange={(e) => setStoreCategory(e.target.value)}
        >
          <option value="all">Categoria</option>
          <option value="supermercado">Supermercado</option>
          <option value="restaurante">Restaurante</option>
          <option value="panaderia">Panaderia</option>
          <option value="mercado">Mercado</option>
        </select>
        <button type="submit">
          <img src="/search-icon.svg" alt="Buscar" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
