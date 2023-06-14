import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import initialFilms from '../../utils/initialFilms.json';

const MoviesCardList = () => {
  const [films, setFilms] = useState([]);
  const remainingFilms = initialFilms.slice(films.length);
  const [isLoading, setIsLoading] = useState(true);

  // временная функция прелодера чтобы показать момент загрузки
  useEffect(() => {
    viewStillFilms()
  }, [])

  function viewStillFilms () {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFilms([...films, ...remainingFilms.slice(0, 9)])
    }, 1000)
  }

  return (
    <section className="movies-card-list">
      {films.length ? (
        <ul className='movies-card-list__lis'>
          {films.map((movie, index) => <MoviesCard movie={movie} key={index} />)}
        </ul>
      ) : ''}
      {isLoading ? <Preloader /> : ""}
      {remainingFilms.length ? <button className='movies-card-list__button' onClick={viewStillFilms}>Ещё</button> : ''}
    </section>
  )
}

export default MoviesCardList;
