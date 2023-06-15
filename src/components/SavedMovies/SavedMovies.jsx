import "./SavedMovies.css";

import { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";
import initialFilms from "../../utils/initialFilms.json";

const SavedMovies = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setFilms(initialFilms.slice(0, 9));
    }, 1000);
  }, []);

  return (
    <>
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList/>
      </main>
    </>
  );
};

export default SavedMovies;
