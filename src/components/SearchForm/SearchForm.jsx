import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function SearchForm({
  handleSearchSubmit,
  handleShortFilms,
  shortMovies,
}) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();

  const [errorQuery, setErrorQuery] = useState("");

  useEffect(() => {
  }, [location.pathname]);

  function handleSubmit(e) {
    e.preventDefault();
    if(isValid){
      handleSearchSubmit(values.search)
      setErrorQuery("");
    }else{
      setErrorQuery("Нужно ввести ключевое слово");
    }
  }

  useEffect(() => {
    setErrorQuery("");
  }, []);

  return (
    <div className="search">
      <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="search__form-container">
          <input
            name="search"
            className={`search__form-input ${
              errors.search ? "search__form-input_error" : ""
            }`}
            onChange={handleChange}
            value={values.search || ""}
            type="text"
            placeholder="Фильм"
            autoComplete="off"
            required
          />
          <span className="search__error">{errorQuery}</span>
        </div>
        <button
          type="submit"
          className={`search__submit ${
            !isValid ? "search__submit_disabled" : ""
          }`}
          //disabled={!isValid}
        >
          Найти
        </button>
      </form>
      <FilterCheckbox shortMovies={shortMovies} handleShortFilms={handleShortFilms} />
    </div>
  );
}
