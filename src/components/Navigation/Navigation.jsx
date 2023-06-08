import './Navigation.css';

export default function Navigation() {
  return (
<>
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
</>
);
}
