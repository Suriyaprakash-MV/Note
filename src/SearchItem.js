import React from "react";
// import searchIcon from "../../assets/search..png";

const SearchItem = ({ search, setSearch }) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Items"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* <img src="searchIcon" alt="Search Icon" /> */}
    </form>
  );
};

export default SearchItem;
