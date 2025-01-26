import "./searchBar.scss";

function SearchBar() {
  return (
    <div className="search-bar">
      <form action="">
        <input type="text" name="store-name" placeholder="Store name" />
        <select name="store-category">
          <option value="all">Categoria</option>
          <option value="supermarket">Supermercado</option>
          <option value="restaurant">Restaurante</option>
          <option value="bakery">Panaderia</option>
        </select>
        <button>
          <img src="/search-icon.svg" alt="Buscar" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
