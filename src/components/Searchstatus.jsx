import React from "react";

const Searchstatus = ({ term, loading, count }) => {
  if (!term) return null;

  return (
    <div className="container">
      <div className="row search__row">
        {loading && (
          <div className="search__controls">
            <div className="search__status visible">
              <p>
                Searching for: <span className="searching__term">"{term}"</span>
              </p>
            </div>
          </div>
        )}

        {!loading && count > 0 && (
          <div className="search__results">
            <h2 className="search__results--title visible">
              Search Results for: "{term}"
            </h2>
          </div>
        )}

        {!loading && count === 0 && (
          <div className="search__results--empty visible">
            No results found for: "{term}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchstatus;
