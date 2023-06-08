import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation.jsx';

function Header() {

  return (
    <header className={'header'}>
      <div className="header__container">
          <img src={logo} alt="Логотип" />
          <Navigation
        />
          </div>
    </header>
  );
}

export default Header;
