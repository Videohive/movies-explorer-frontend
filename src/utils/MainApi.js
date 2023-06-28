import { BASE_URL } from './constants.js';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    };
  }

  _fetchWithCheck(endpoint, config = {}) {
    return fetch(`${this._baseUrl}/${endpoint}`, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        ...config.headers,
      },
    })
    .then(response => {
      return response.json().then(data => {
        if (!response.ok) {
          throw new Error(data.message);
        }
        return data;
      });
    });
  }

  createUser({ name, email, password }) {
    return this._fetchWithCheck('signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  login({ email, password }) {
    return this._fetchWithCheck('signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  getUserInfo() {
    return this._fetchWithCheck('users/me');
  }

  updateUser({ name, email }) {
    return this._fetchWithCheck('users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, email }),
    });
  }

  getSavedMovies() {
    return this._fetchWithCheck('movies');
  }

  addNewMovie(movieData) {
    return this._fetchWithCheck('movies', {
      method: 'POST',
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: movieData.image,
        trailerLink: movieData.trailerLink,
        thumbnail: movieData.thumbnail,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
    });
  }

  deleteMovie(movieId) {
    return this._fetchWithCheck(`movies/${movieId}`, {
      method: 'DELETE',
    });
  }
}

const mainApi = new Api({
  baseUrl: BASE_URL,
});

export default mainApi;
