import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export default function Register() {

  return (
    <main className="register">
      <form className="register__form" name="register" noValidate>
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              name="name"
              className='register__input'
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            />
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              name="email"
              className='register__input'
              type="email"
              required
            />
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              name="password"
              className='register__input'
              type="password"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className={'register__button'}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  )
}
