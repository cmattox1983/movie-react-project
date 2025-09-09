import React from "react";
import { Link, useParams } from "react-router-dom";

const Findmovies = ({ movies, sortOption }) => {
  const { title } = useParams();
  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "RATING_DESC") return b.imdbRating - a.imdbRating;
    if (sortOption === "RATING_ASC") return a.imdbRating - b.imdbRating;
    if (sortOption === "YEAR_DESC") return b.Year - a.Year;
    if (sortOption === "YEAR_ASC") return a.Year - b.Year;
    return 0;
  });

  return (
    <>
      {sortedMovies.slice(0, 6).map((movie) => (
        <div key={movie.imdbID} className="movie">
          <div className="movie__info">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img
                src={movie.Poster}
                alt={`${movie.Title} Poster`}
                className="movie__poster"
              />
            ) : (
              <div className="movie__poster movie__poster--missing">
                No Poster Available
              </div>
            )}
            <Link
              to={`/movie/${movie.imdbID}`}
              state={{ fromTitle: title }}
              className="modal__movie"
            >
              <span className="movie__overlay-text poster__overlay">
                🎥 Go to Movie Details
              </span>
            </Link>
          </div>

          <div className="movie__description">
            <p className="movie__title">🎬 {movie.Title}</p>
            <p className="movie__year">📆 {movie.Year}</p>
            {movie.imdbRating && (
              <p className="movie__rating">⭐ {movie.imdbRating}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Findmovies;
