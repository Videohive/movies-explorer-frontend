import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.jsx";

import React, { useEffect } from 'react';
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";

export default function SearchForm() {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values.search); // здесь вы можете выполнить поиск
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

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
          <span className="search__error">{errors.search || ""}</span>
        </div>
        <button
          type="submit"
          className={`search__submit ${
            !isValid ? "search__submit_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

