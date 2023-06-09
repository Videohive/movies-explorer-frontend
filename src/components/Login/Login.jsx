import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";

export default function Login() {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="login">
      <form
        className="login__form"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <Link to="/" className="login__link login__link-logo">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <div className="login__labels-container">
          <label className="login__label">
            <span className="login__label-text">E-mail</span>
            <input
              name="email"
              className={`login__input ${
                errors.email ? "login__input_error" : ""
              }`}
              onChange={handleChange}
              value={values.email || ""}
              type="email"
              autoComplete="email"
              required
            />
            <span className="login__error">{errors.email || ""}</span>
          </label>
          <label className="login__label">
            <span className="login__label-text">Пароль</span>
            <input
              name="password"
              className={`login__input ${
                errors.password ? "login__input_error" : ""
              }`}
              onChange={handleChange}
              value={values.password || ""}
              type="password"
              autoComplete="current-password"
              required
            />
            <span className="login__error">{errors.password || ""}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`login__button ${
            !isValid ? "login__button_disabled" : ""
          }`}
          disabled={!isValid}
        >
          Войти
        </button>
        <span className="login__support">
          Ещё не зарегистрированы?&nbsp;
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </form>
    </main>
  );
}
