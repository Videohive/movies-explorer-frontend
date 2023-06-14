import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";

function Header() {
  const location = useLocation();

  return (
    <header className={"header"}>
      <div
        className={`header__container header_theme_${
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

export default Header;
