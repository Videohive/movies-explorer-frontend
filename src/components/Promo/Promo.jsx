import './Promo.css';
import logo from '../../images/landing-logo.svg';

export default function Hero() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__about-project">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
        </div>
        <img src={logo} alt="логотип" className="promo__logo" />
      </div>
    </section>
  );
}
