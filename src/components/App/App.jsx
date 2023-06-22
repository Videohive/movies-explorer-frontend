import "./App.css";
import mainApi from "../../utils/MainApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useState, useEffect } from "react";
import {
  useRoutes,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import Preloader from '../Preloader/Preloader.jsx';
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    successful: true,
    text: "",
  });

  const [load, setLoad] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(null);

  function NotFoundWithBackButton() {
    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1, { replace: true });
    };

    return <NotFound goBack={goBack} />;
  }

  function handleRegister({ name, email, password }) {
    setIsLoader(true);
    mainApi
      .createUser({ name, email, password })
      .then((data) => {
        if (data._id) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => setServerError(err.message))
      .finally(() => setIsLoader(false));
  }

  function handleLogin({ email, password }) {
    setIsLoader(true);
    mainApi
      .login({ email, password })
      .then((jwt) => {
        if (jwt.token) {
          localStorage.setItem("jwt", jwt.token);
          setLoggedIn(true);
          handleUser();
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => setServerError(err.message))
      .finally(() => setIsLoader(false));
  }

  function handleProfile({ name, email }) {
    setIsLoader(true);
    mainApi
      .updateUser({ name, email }) // передаем объект
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((err) => setServerError(err.message))
      .finally(() => setIsLoader(false));
  }

  function handleUser() {
    setIsLoader(true);
    mainApi
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => setServerError(err.message))
      .finally(() => setIsLoader(false));
  }

  function handleSignOut() {
    setCurrentUser({});
    setLoggedIn(false);
    localStorage.clear();
    navigate("/", { replace: true });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setLoggedIn(true);
      handleUser();
    }
  }, []);

  // добавление фильма
  async function handleSaveMovie(movie) {
    try {
      const newMovie = await mainApi.addNewMovie(movie);
      setSavedMoviesList([newMovie, ...savedMoviesList]);
    } catch (err) {
      setIsInfoTooltip({ isOpen: true, successful: false, text: err });
    }
  }

  // удаление фильма
  async function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );
    try {
      await mainApi.deleteMovie(savedMovie._id);
      const newMoviesList = savedMoviesList.filter(
        (m) => movie.id !== m.movieId && movie.movieId !== m.movieId
      );
      setSavedMoviesList(newMoviesList);
    } catch (err) {
      setIsInfoTooltip({ isOpen: true, successful: false, text: err });
    }
  }

  // проверка токена и авторизация пользователя
  useEffect(() => {
    (async function authenticateUser() {
      const path = location.pathname;
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        setIsLoader(true);
        try {
          const data = await mainApi.getUserInfo();
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
            navigate(path, { replace: true });
          }
        } catch (err) {
          //setIsInfoTooltip({ isOpen: true, successful: false, text: err });
        } finally {
          setIsLoader(false);
          setLoad(true);
        }
      } else {
        setLoad(true);
      }
    })();
  }, [navigate]);

  // получение информации о пользователе
  useEffect(() => {
    (async function getUserInfo() {
      if (loggedIn) {
        setIsLoader(true);
        try {
          const res = await mainApi.getUserInfo();
          setCurrentUser(res);
        } catch (err) {
          //setIsInfoTooltip({ isOpen: true, successful: false, text: err });
        } finally {
          setIsLoader(false);
        }
      }
    })();
  }, [loggedIn]);

  // получение массива сохраненных фильмов
  useEffect(() => {
    (async function getSavedMovies() {
      if (loggedIn && currentUser) {
        try {
          const data = await mainApi.getSavedMovies();
          const UserMoviesList = data.filter(
            (m) => m.owner === currentUser._id
          );
          setSavedMoviesList(UserMoviesList);
        } catch (err) {
          setIsInfoTooltip({ isOpen: true, successful: false, text: err });
        }
      }
    })();
  }, [currentUser, loggedIn]);

  let element = useRoutes([
    { path: "/", element: <Main /> },
    {
      path: "signup",
      element: (
        <Register handleRegister={handleRegister} serverError={serverError} />
      ),
    },
    {
      path: "signin",
      element: <Login handleLogin={handleLogin} serverError={serverError} />,
    },
    {
      path: "movies",
      element: (
        <ProtectedRoute
          isLoggedIn={loggedIn}
          element={Movies}
          savedMoviesList={savedMoviesList}
          onLikeClick={handleSaveMovie}
          onDeleteClick={handleDeleteMovie}
        />
      ),
    },
    {
      path: "saved-movies",
      element: (
        <ProtectedRoute
          isLoggedIn={loggedIn}
          element={SavedMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={handleSaveMovie}
          onDeleteClick={handleDeleteMovie}
        />
      ),
    },
    {
      path: "profile",
      element: (
        <ProtectedRoute
          isLoggedIn={loggedIn}
          element={Profile}
          handleProfile={handleProfile}
          handleSignOut={handleSignOut}
          serverError={serverError}
        />
      ),
    },
    { path: "*", element: <NotFoundWithBackButton /> },
  ]);

  return (
    <div className="app">
      {!load ? (
        <Preloader isOpen={isLoader} />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Header loggedIn={loggedIn} />
          {element}
          <Footer />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}
