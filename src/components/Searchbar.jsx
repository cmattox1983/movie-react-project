import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ className = "" }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();

  const onSearch = () => {
    const term = searchTitle.trim();
    if (!term) return;
    navigate(`/search/${encodeURIComponent(term)}`);
  };

  return (
    <section id="search_bar">
      <div className="search__info">
        <h1 className="search__title">Browse our movies</h1>
        <div className="search__wrapper">
          <input
            id="searchInput"
            type="text"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
          <div className="search__wrapper--button">
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Searchbar;
