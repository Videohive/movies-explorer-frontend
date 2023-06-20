import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";

export default function Header() {
  const location = useLocation();
  const headerRoutes = ["/", "/movies", "/saved-movies", "/profile"];

  if (headerRoutes.includes(location.pathname)) {
    return (
      <header className={"header"}>
        <div
          className={`header__container header__container_theme_${
            location.pathname === "/" ? "bright" : "dark"
          }`}
        >
          <Link to="/" className="header__link">
            <img src={logo} alt="Логотип" />
          </Link>
          <Navigation />
        </div>
      </header>
    );
  }
}
