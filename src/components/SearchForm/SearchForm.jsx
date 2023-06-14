import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

function SearchForm() {
  return (
    <div className="search">
      <form className="search-form__form" noValidate>
        <div className="search-form__form-container">
          <input
            className="search__form-input"
            type="text"
            placeholder="Фильм"
            required
            autoComplete="off"
          />
          <span className="search__error"></span>
        </div>
        <button type="submit" className="search__submit">
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
