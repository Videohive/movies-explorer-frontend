import "./Profile.css";

import { useEffect,useContext } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";

export default function Profile({ handleSignOut, handleProfile, serverError }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    handleProfile(values);
  }

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const profileValidity = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <main className="profile">
      <form className="profile__form" name="profile" onSubmit={handleSubmit}>
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
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
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="profile__error">{errors.email || ""}</span>
          </label>
        </div>
        {serverError &&<span className="profile__error profile__error-message">{serverError}</span>}
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit ${
              profileValidity ? "" : "profile__button-edit_disabled"
            }`}
            disabled={profileValidity ? true : false}
          >
            Редактировать
          </button>
          <button type="submit" className="profile__button-exit" onClick={handleSignOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
