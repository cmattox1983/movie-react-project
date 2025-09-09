import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import Findmovies from "../components/Findmovies";
import Loadingstate from "../components/Loadingstate";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sortdropdown from "../components/Sortdropdown";
import Searchstatus from "../components/Searchstatus";

const Search = () => {
  const { title } = useParams();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [sortOption, setSortOption] = useState("");

  async function getMovies(title) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=21fba792&s=${encodeURIComponent(
          title
        )}`
      );

      setMovies(
        data.Response === "True"
          ? await Promise.all(
              data.Search.map(async (movie) => {
                const { data } = await axios.get(
                  `https://www.omdbapi.com/?apikey=21fba792&i=${movie.imdbID}`
                );
                return data;
              })
            )
          : []
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (title) getMovies(title);
  }, [title]);

  return (
    <>
      <Navbar />
      <Searchbar />
      <Searchstatus term={title} loading={loading} count={movies.length} />

      <div className="container">
        <div className="row">
          {!loading && (
            <Sortdropdown value={sortOption} onChange={setSortOption} />
          )}
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="movie__links">
            {loading && <Loadingstate />}
            {!loading && <Findmovies movies={movies} sortOption={sortOption} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
