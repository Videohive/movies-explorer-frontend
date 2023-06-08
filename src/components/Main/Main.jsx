import "./Main.css";
import Hero from "../Hero/Hero.jsx";
import AboutProject from "../AboutProject/AboutProject.jsx";
import Technology from "../Technology/Technology.jsx";
import AboutMe from "../AboutMe/AboutMe.jsx";
import Portfolio from "../Portfolio/Portfolio.jsx";

export default function Main() {
  return (
    <main className="main">
      <Hero />
      <AboutProject />
      <Technology />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
