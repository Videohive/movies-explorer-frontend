import "./AboutMe.css";
import avatar from "../../images/avatar.jpg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Актер</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Киану</h3>
            <p className="about-me__age">Фронтенд-разработчик, 58 лет</p>
            <p className="about-me__text">
              Привет, это Киану Ривз. Моя история началась в Бейруте, Ливан, где
              я родился 2 сентября 1964 года. Однако большую часть своей жизни я
              провёл в Торонто, Канада. Моё образование было разнообразным,
              включая школу искусств и колледж в Торонто. Однако карьера актера
              всегда была моей страстью, и я решил учиться актёрскому
              мастерству. После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://github.com/Videohive"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={avatar}
            alt="фотография разработчика приложения"
          />
        </div>
      </div>
    </section>
  );
}
