import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { convertTime } from "../../utils/utils.js";

const MoviesCard = ({ movie, saved, onLikeClick, onDeleteClick }) => {
  // Используем хук useLocation для получения текущего объекта местоположения
  const location = useLocation();

  // Деструктуризация необходимых свойств из объекта фильма
  const { trailerLink, image, nameRU, duration, liked } = movie;

  // Хук состояния для отслеживания, понравился ли фильм пользователю
  const [isLiked, setIsLiked] = useState(liked);

  // Функция обработчика клика по кнопке "Мне нравится"
  function handleLikeClick() {
    // Изменение состояния isLiked на противоположное
    setIsLiked(!isLiked);
    // Вызов функции-обработчика из пропсов с объектом фильма
    onLikeClick(movie);
  }

  // Функция обработчика клика по кнопке "Удалить"
  function handleDeleteClick() {
    // Вызов функции-обработчика из пропсов с объектом фильма
    onDeleteClick(movie);
  }

  // Функция обработчика клика по карточке фильма
  const handleClickCard = (e) => {
    // Если клик был не по кнопке "Мне нравится" и не по кнопке "Удалить"
    if (
      !e.target.classList.contains("movies-card__like") &&
      !e.target.classList.contains("movies-card__delete")
    ) {
      // Открываем ссылку на трейлер в новой вкладке
      window.open(trailerLink, "_blank");
    }
  };

  return (
    <li className="movies-card" onClick={handleClickCard}>
      <img src={image} alt={nameRU} className="movies-card__image" />
      <div className="movies-card__column">
        <h4 className="movies-card__title">{nameRU}</h4>
        {location.pathname === "/movies" && (
          <button
            className={`movies-card__like${
              saved ? " movies-card__like_active" : ""
            }`}
            onClick={saved ? handleDeleteClick : handleLikeClick}
            title={`${
              saved ? "Удалить из избранного" : "Добавить в избранное"
            }`}
          ></button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            className="movies-card__delete"
            onClick={handleDeleteClick}
            title="Удалить из избранного"
          >
            &#215;
          </button>
        )}
      </div>
      <span className="movies-card__duration">{convertTime(duration)}</span>
    </li>
  );
};

export default MoviesCard;
