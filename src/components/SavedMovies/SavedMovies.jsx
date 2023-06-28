import "./SavedMovies.css";
import { useState, useEffect } from "react";
import { filterMovies, filterShortMovies } from "../../utils/utils.js";
import SearchForm from "../SearchForm/SearchForm.jsx";
import MoviesCardList from "../MoviesCardList/MoviesCardList.jsx";

export default function SavedMovies({
  onDeleteClick,
  savedMoviesList,
  setIsInfoTooltip,
}) {

  const [shortMovies, setShortMovies] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);
    if (moviesList.length === 0) {
      setNotFound(true);
      setIsInfoTooltip({
        isOpen: true,
        successful: false,
        text: "Ничего не найдено.",
      });
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    setShowedMovies(shortMovies ? filteredMovies : filterShortMovies(filteredMovies));
    setNotFound(showedMovies.length === 0);
  }

  useEffect(() => {
    setShowedMovies(savedMoviesList);
    setNotFound(savedMoviesList.length === 0);
  }, [savedMoviesList]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!NotFound && (
        <MoviesCardList
          moviesList={showedMovies}
          savedMoviesList={savedMoviesList}
          onDeleteClick={onDeleteClick}
        />
      )}
    </main>
  );
}
