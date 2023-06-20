// компонент одной карточки фильма
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
  const location = useLocation();
  const { image, nameRU, duration, liked } = movie;
  const [isLiked, setIsLiked] = useState(liked)

  function handleClickLikeButton () {
    setIsLiked(!isLiked)
  };

  function convertTime (minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м`;
  };

  return (

    <li className='movies-card'>
      <img src={image.url} alt={nameRU} className='movies-card__image' />
      <div className='movies-card__column'>
        <h4 className='movies-card__title'>{nameRU}</h4>
        {location.pathname === '/movies' && (
        <button
          className={`movies-card__like${isLiked ? ' movies-card__like_active' : ''}`}
          onClick={handleClickLikeButton}
          title={`${isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}`}
        ></button>
        )}
        {location.pathname === '/saved-movies' && (
          <button
            className='movies-card__delete'
            title="Удалить из избранного"
        >&#215;</button>
        )}
      </div>
      <span  className='movies-card__duration'>{convertTime(duration)}</span>
    </li>
  );
};

export default MoviesCard;
