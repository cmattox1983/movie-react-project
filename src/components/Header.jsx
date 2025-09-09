import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();

  const onSearch = () => {
    const term = searchTitle.trim();
    if (!term) return;
    navigate(`/search/${encodeURIComponent(term)}`);
  };

  useEffect(() => {
    setTitleVisible(true);
    const id = setTimeout(() => setSubtitleVisible(true), 500);
    document.getElementById("searchInput")?.focus();
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="header__description">
              <h1 className={`header__title ${titleVisible ? "fade-in" : ""}`}>
                The most-searched movie platform in the USA
              </h1>
              <h2
                className={`header__sub-title ${
                  subtitleVisible ? "fade-in" : ""
                }`}
              >
                FIND YOUR FAVORITE MOVIES WITH
                <span className="gold"> POSTERIZE</span>
              </h2>
              <div className="header__wrapper search__wrapper">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search by Title"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSearch()}
                />
                <div className="search__wrapper--button">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    onClick={onSearch}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
