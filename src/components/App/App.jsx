import "./App.css";
import mainApi from "../../utils/MainApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useState, useEffect } from "react";
import { useRoutes, useNavigate, useLocation } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Main from "../Main/Main.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import Movies from "../Movies/Movies.jsx";
import SavedMovies from "../SavedMovies/SavedMovies.jsx";
import Profile from "../Profile/Profile.jsx";
import Register from "../Register/Register.jsx";
import Login from "../Login/Login.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "../InfoTooltip/InfoTooltip.jsx";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    status: true,
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

  function closeInfoTooltip() {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: false });
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
  function handleSaveMovie(movie) {
    mainApi
      .addNewMovie(movie)
      .then((newMovie) => {
        setSavedMoviesList([newMovie, ...savedMoviesList]);
      })
      .catch((err) => {
        setIsInfoTooltip({ isOpen: true, status: false, text: err });
      });
  }

  // удаление фильма
  function handleDeleteMovie(movie) {
    const savedMovie = savedMoviesList.find(
      (item) => item.movieId === movie.id || item.movieId === movie.movieId
    );

    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = savedMoviesList.filter(
          (m) => movie.id !== m.movieId && movie.movieId !== m.movieId
        );
        setSavedMoviesList(newMoviesList);
      })
      .catch((err) => {
        setIsInfoTooltip({ isOpen: true, status: false, text: err });
      });
  }

  // проверка токена и авторизация пользователя
  useEffect(() => {
    const path = location.pathname;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setCurrentUser(data);
            navigate(path, { replace: true });
          }
        })
        .catch((err) =>
          setIsInfoTooltip({ isOpen: true, status: false, text: err })
        )
        .finally(() => {
          setIsLoader(false);
          setLoad(true);
        });
    } else {
      setLoad(true);
    }
  }, []);

  // получение информации о пользователе
  useEffect(() => {
    if (loggedIn) {
      setIsLoader(true);
      mainApi
        .getUserInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) =>
          setIsInfoTooltip({ isOpen: true, status: false, text: err })
        )
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);

  // получение массива сохраненных фильмов
  useEffect(() => {
    if (loggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then((data) => {
          const UserMoviesList = data.filter(
            (m) => m.owner === currentUser._id
          );
          setSavedMoviesList(UserMoviesList);
        })
        .catch((err) => {
          setIsInfoTooltip({ isOpen: true, status: false, text: err });
        });
    }
  }, [currentUser, loggedIn]);

  const element = useRoutes([
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
          setIsLoader={setIsLoader}
          setIsInfoTooltip={setIsInfoTooltip}
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
          setIsInfoTooltip={setIsInfoTooltip}
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
          <InfoTooltip
            isInfoTooltip={isInfoTooltip}
            onClose={closeInfoTooltip}
          />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}
