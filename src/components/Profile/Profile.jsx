import "./Profile.css";

import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";

export default function Profile() {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, Киану!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className={`profile__input ${
                errors.name ? "profile__input_error" : ""
              }`}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              placeholder="Киану"
              value={values.name || ""}
              onChange={handleChange}
            />
            <span className="profile__error">{errors.name || ""}</span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className={`profile__input ${
                errors.email ? "profile__input_error" : ""
              }`}
              type="email"
              required
              placeholder="matrix@has.you"
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="profile__error">{errors.email || ""}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${
              isValid ? "" : "profile__button-edit_disabled"
            }`}
            disabled={!isValid}
          >
            Редактировать
          </button>
          <button type="submit" className="profile__button-exit">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
