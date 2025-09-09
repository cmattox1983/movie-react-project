import React from "react";

const Sortdropdown = ({ value, onChange }) => {
  return (
    <>
      <div className="search__controls">
        <select
          id="filter"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="YEAR_ASC">Year, Oldest to Newest</option>
          <option value="YEAR_DESC">Year, Newest to Oldest</option>
          <option value="RATING_ASC">Rating, Lowest to Highest</option>
          <option value="RATING_DESC">Rating, Highest to Lowest</option>
        </select>
      </div>
    </>
  );
};

export default Sortdropdown;
