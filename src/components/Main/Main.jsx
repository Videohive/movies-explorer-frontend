import "./Main.css";
import Promo from "../Promo/Promo.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Technology from "../Technology/Technology.jsx";
import AboutMe from "../AboutMe/AboutMe.jsx";
import Portfolio from "../Portfolio/Portfolio.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Technology />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
}
