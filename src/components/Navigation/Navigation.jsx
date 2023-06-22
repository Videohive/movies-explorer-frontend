import React, { useState, useEffect } from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import Burger from "../Burger/Burger.jsx";

export default function Navigation({ loggedIn }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const location = useLocation();

  function CustomLink({ to, children, className, isMobile }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    // Создание имени класса активной ссылки в зависимости от типа устройства
    const activeClassName = isActive
      ? `navigation__link_active-${isMobile ? "mobile" : "desktop"}`
      : "";

    // Объединение всех классов в одну строку
    const combinedClassName = `${className} ${activeClassName}`.trim();

    return (
      <NavLink to={to} className={combinedClassName}>
        {children}
      </NavLink>
    );
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOverlayClick = () => {
    setOpen(false);
  };

  const renderNavContent = () => (
    <nav
      className={`navigation ${
        isMobile && location.pathname !== "/" ? "navigation-burger" : ""
      }`}
    >
      <ul
        className={`navigation__list ${
          isMobile && location.pathname !== "/" ? "navigation__list-burger" : ""
        }`}
      >
        {!loggedIn ? (
          <>
            <li>
              <NavLink
                to="/signup"
                className="navigation__link navigation__link-register navigation__link_landing"
              >
                Регистрация
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signin"
                className="navigation__link navigation__link_landing navigation__link_signin"
              >
                Войти
              </NavLink>
            </li>
          </>
        ) : (
          <>
            {isMobile && (
              <li className="navigation__item">
                <CustomLink
                  to="/"
                  className={`navigation__link navigation__link-mobile ${
                    isMobile && location.pathname !== "/"
                      ? "navigation__link-burger"
                      : ""
                  }`}
                  isMobile={isMobile}
                >
                  Главная
                </CustomLink>
              </li>
            )}
            <li className="navigation__item">
              <CustomLink
                to="/movies"
                className={`navigation__link navigation__link-mobile ${
                  isMobile && location.pathname !== "/"
                    ? "navigation__link-burger"
                    : ""
                }`}
                isMobile={isMobile}
              >
                Фильмы
              </CustomLink>
            </li>
            <li className="navigation__item">
              <CustomLink
                to="/saved-movies"
                className={`navigation__link navigation__link-mobile ${
                  isMobile && location.pathname !== "/"
                    ? "navigation__link-burger"
                    : ""
                }`}
                isMobile={isMobile}
              >
                Сохранённые фильмы
              </CustomLink>
            </li>
            <li className="navigation__item">
              <NavLink
                to="/profile"
                className="navigation__link navigation__link_type_account"
              >
                Аккаунт
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );

  return (
    <div className="navigation-container">
      {isMobile && location.pathname !== "/" ? (
        <>
          <Burger open={open} setOpen={setOpen} />
          <div
            className={`navigation__modal ${
              open ? "navigation__modal-open" : ""
            }`}
          >
            {open && renderNavContent()}
          </div>
          <div
            className={`navigation__overlay ${
              open ? "" : "navigation__overlay-hidden"
            }`}
            onClick={handleOverlayClick}
          />
        </>
      ) : (
        renderNavContent()
      )}
    </div>
  );
}
