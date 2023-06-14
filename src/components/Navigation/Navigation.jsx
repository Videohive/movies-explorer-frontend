import './Navigation.css';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li className='navigation__link navigation__link_landing'>
              Регистрация
            </li>
            <li className='navigation__link navigation__link_landing navigation__link_signin'>
              Войти
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navigation">
          <ul className="navigation__list">
            <li className="navigation__item">
              <NavLink to='/movies' className='navigation__link'>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to='/saved-movies' className='navigation__link'>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to='/profile' className='navigation__link navigation__link_type_account'>
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
