import './Profile.css';

export default function Profile() {
  return (
    <main className="profile">
      <form className="profile__form" name="profile">
        <h1 className="profile__title">Привет, Киану!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className={`profile__input`}
              type="text"
              required
              minLength="2"
              maxLength="30"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              placeholder='Киану'
            />
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className={`profile__input`}
              type="email"
              required
              placeholder='matrix@has.you'
            />
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className={`profile__button-edit`}
          >
            Редактировать
          </button>
          <button type="submit" className="profile__button-exit">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
