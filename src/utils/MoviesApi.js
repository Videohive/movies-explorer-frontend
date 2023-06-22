import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // проверка статуса запроса
  async _requestResult(res) {
    const result = await res.json();
    return res.ok ? result : Promise.reject(res);
  }

  // регистрация
  async getMovies() {
    const res = await fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return this._requestResult(res);
  }

}

const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export default moviesApi;
