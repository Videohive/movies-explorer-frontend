import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import initialFilms from '../../utils/initialFilms.json';

const MoviesCardList = () => {
  const [films, setFilms] = useState([]);
  const remainingFilms = initialFilms.slice(films.length);
  const [isLoading, setIsLoading] = useState(true);

  function viewStillFilms() {
    setIsLoading(true);
    setFilms([...films, ...remainingFilms.slice(0, 6)]);
    setIsLoading(false);
  }

  useEffect(() => {
    viewStillFilms()
  }, [])

  return (
    <section className="movies-card-list">
      {films.length ? (
        <ul className='movies-card-list__list'>
          {films.map((movie, index) => <MoviesCard movie={movie} key={index} />)}
        </ul>
      ) : ''}
      {isLoading ? <Preloader /> : ""}
      {remainingFilms.length ? <button className='movies-card-list__button' onClick={viewStillFilms}>Ещё</button> : ''}
    </section>
  )
}

export default MoviesCardList;
