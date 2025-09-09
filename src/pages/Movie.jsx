import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Movie = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const fromTitle = useLocation().state?.fromTitle || "";

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMovie() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=21fba792&i=${encodeURIComponent(
          imdbID
        )}`
      );
      setTimeout(() => {
        setMovie(data.Response === "True" ? data : null);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Error fetching movie:", err);
      setTimeout(() => {
        setMovie(null);
        setLoading(false);
      }, 500);
    }
  }

  useEffect(() => {
    if (imdbID) fetchMovie();
  }, [imdbID]);

  const goBack = () =>
    navigate(
      fromTitle ? `/search/${encodeURIComponent(fromTitle)}` : "/search"
    );

  if (loading) {
    return (
      <div className="movie-details__skeleton">
        <button className="back_btn">...Loading</button>
        <div className="skeleton skeleton-poster"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <>
        <button className="back_btn" onClick={goBack}>
          Back to Search Results
        </button>
        <p>Movie not found.</p>
      </>
    );
  }

  return (
    <>
      <button className="back_btn" onClick={goBack}>
        Back to Search Results
      </button>
      <div className="container">
        <div className="row">
          <div className="movie-details">
            <h1 className="movie-details__title">
              {movie.Title} ({movie.Year})
            </h1>

            <div className="movie-details__content">
              <div className="movie-details__poster">
                <div className="movie__info">
                  {movie.Poster && movie.Poster !== "N/A" ? (
                    <img
                      src={movie.Poster}
                      alt={`${movie.Title} Poster`}
                      className="movie__poster"
                    />
                  ) : (
                    <div>No Poster Available</div>
                  )}
                  <a
                    href={movie.Poster}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal__movie"
                  >
                    <span className="movie__overlay-text poster__overlay">
                      🎥 Get Poster
                    </span>
                  </a>
                </div>
              </div>

              <div className="movie-details__meta">
                <p>⭐ {movie.imdbRating}</p>
                <p>
                  <b>Rated:</b> {movie.Rated}
                </p>
                <p>
                  <b>Runtime:</b> {movie.Runtime}
                </p>
                <p>
                  <b>Genre:</b> {movie.Genre}
                </p>
                <p>
                  <b>Director:</b> {movie.Director}
                </p>
                <p>
                  <b>Cast:</b> {movie.Actors}
                </p>
                <p>
                  <b>Plot:</b> {movie.Plot}
                </p>
                <p>
                  <b>Language:</b> {movie.Language}
                </p>
                <p>
                  <b>Country:</b> {movie.Country}
                </p>
                <p>
                  <b>Awards:</b> {movie.Awards}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
