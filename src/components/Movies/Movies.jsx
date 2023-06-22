import './Movies.css';
import { useState, useContext, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.jsx';

export default function Movies({ savedMoviesList, onLikeClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="movies">
      <SearchForm/>
      <MoviesCardList/>
    </main>
  );
}
