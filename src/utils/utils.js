import { SHORTS_DURATION } from './constants.js';

function transformImagesMovies(movies) {
  movies.forEach(movie => {
    movie.thumbnail = `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
    movie.image = `https://api.nomoreparties.co${movie.image.url}`
    });
  return movies
}

// Фильтрует фильмы короткой продолжительности
function filterShortMovies(movies) {
  return movies.filter(function(movie) {
    return movie.duration < SHORTS_DURATION;
  });
}

// Фильтрует фильмы по пользовательскому запросу и наличию флажка для короткометражных фильмов
function filterMovies(movies, userQuery, shortMoviesCheckbox) {
  const moviesByUserQuery = movies.filter(function(movie) {
    const movieRu = String(movie.nameRU).toLowerCase();
    const movieEn = String(movie.nameEN).toLowerCase();
    const userMovie = userQuery.toLowerCase();
    return movieRu.includes(userMovie) || movieEn.includes(userMovie);
  });

  return shortMoviesCheckbox ? filterShortMovies(moviesByUserQuery) : moviesByUserQuery;
}

// Конвертирует время из минут в формат "чч мм"
function convertTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}ч ${remainingMinutes}м`;
};

// Ищет карточку сохраненного фильма
function getSavedMovieCard(arr, movie) {
  return arr.find(function(item) {
    return item.movieId === (movie.id || movie.movieId);
  });
}

const screenConfig = {
  desktop: { initial: 12, loadMore: 3, min: 1280 },
  tablet: { initial: 8, loadMore: 2, min: 768 },
  mobile: { initial: 5, loadMore: 2, min: 320 },
};

// Возвращает конфигурацию экрана в зависимости от ширины
function getScreenConfig(width) {
  if (width >= screenConfig.desktop.min) {
    return screenConfig.desktop;
  } else if (width >= screenConfig.tablet.min) {
    return screenConfig.tablet;
  } else {
    return screenConfig.mobile;
  }
};

// Задерживает выполнение функции на определенное количество миллисекунд
function debounce(fn, ms) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(function() {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
};

export {
  transformImagesMovies,
  filterShortMovies,
  filterMovies,
  convertTime,
  getSavedMovieCard,
  getScreenConfig,
  debounce
};
