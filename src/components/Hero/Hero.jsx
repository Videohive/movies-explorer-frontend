import './Hero.css';
import logo from '../../images/landing-logo.svg';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__about-project">
          <h1 className="hero__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
        </div>
        <img src={logo} alt="логотип" className="hero__logo" />
      </div>
    </section>
  );
}
