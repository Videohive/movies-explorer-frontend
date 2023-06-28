import React, { useState, useEffect } from "react";
import "./Navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import Burger from "../Burger/Burger.jsx";
import profile from "../../images/profile.svg";

export default function Navigation({ loggedIn }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [isExtraSmall, setIsExtraSmall] = useState(window.innerWidth < 400);
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

  const handleOverlayClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
      setIsExtraSmall(window.innerWidth < 400);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

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
            {isMobile && location.pathname !== "/" && (
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
                className={`navigation__link ${
                  isMobile && location.pathname !== "/"
                    ? "navigation__link-mobile navigation__link-burger"
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
                className={`navigation__link ${
                  isMobile && location.pathname !== "/"
                    ? "navigation__link-mobile navigation__link-burger"
                    : ""
                }`}
                isMobile={isMobile}
              >
                Сохранённые фильмы
              </CustomLink>
            </li>
            <li
              className={`navigation__item ${
                isMobile && location.pathname !== "/"
                  ? "navigation__item-mobile"
                  : ""
              }`}
            >
              <NavLink
                to="/profile"
                className={`navigation__link ${
                  isMobile && location.pathname !== "/"
                    ? "navigation__link_type_account navigation__link_type_account-mobile"
                    : "navigation__link_type_account"
                }`}
              >
                <img src={profile} alt="профиль" />
                {!(isExtraSmall && location.pathname === "/") && "Аккаунт"}
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
