import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

import {useState, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.jsx";

export default function Register({ handleRegister, serverError }) {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values)
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main className="register">
      <form className="register__form" name="register" onSubmit={handleSubmit}>
        <Link to="/" className="register__link register__link-logo">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              name="name"
              className={`register__input ${errors.name ? 'register__input_error' : ''}`}
              type="text"
              autoComplete="username"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              value={values.name || ""}
              onChange={handleChange}
            />
            <span className="register__error">{errors.name || ""}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              className={`register__input ${errors.email ? 'register__input_error' : ''}`}
              type="email"
              autoComplete="email"
              required
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="register__error">{errors.email || ""}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className={`register__input ${errors.password ? 'register__input_error' : ''}`}
              type="password"
              autoComplete="current-password"
              required
              value={values.password || ""}
              onChange={handleChange}
            />
            <span className="register__error">{errors.password || ""}</span>
          </label>
        </div>
        {serverError &&<span className="register__error register__error-message">{serverError}</span>}
        <button
          type="submit"
          className={`register__button ${
            isValid ? "" : "register__button_disabled"
          }`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  );
}
