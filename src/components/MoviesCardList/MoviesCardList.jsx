import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { getScreenConfig, debounce } from "../../utils/utils.js";
import { getSavedMovieCard } from "../../utils/utils.js";
import "./MoviesCardList.css";

const MoviesCardList = ({
  moviesList,
  savedMoviesList,
  onLikeClick,
  onDeleteClick,
}) => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowDimensions = debounce(
    () => setWindowWidth(window.innerWidth),
    500
  );

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const config = getScreenConfig(windowWidth);
    setFilms(moviesList.slice(0, config.initial));
    setIsLoading(false);
  }, [moviesList, windowWidth]);

  const handleLoadMore = () => {
    setIsLoading(true);
    const config = getScreenConfig(windowWidth);
    setFilms(moviesList.slice(0, films.length + config.loadMore));
    setIsLoading(false);
  };

  return (
    <section className="movies-card-list">
      {films.length ? (
        <ul className="movies-card-list__list">
          {films.map((movie) => (
            <MoviesCard
              saved={getSavedMovieCard(savedMoviesList, movie)}
              onLikeClick={onLikeClick}
              onDeleteClick={onDeleteClick}
              movie={movie}
              key={movie.id || movie._id}
            />
          ))}
        </ul>
      ) : null}
      {isLoading && <Preloader />}
      {films.length < moviesList.length && !isLoading && (
        <button className="movies-card-list__button" onClick={handleLoadMore}>
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;
