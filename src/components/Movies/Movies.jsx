import './Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from "../Footer/Footer.jsx";

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList/>
      <Footer />
    </main>
  );
}
