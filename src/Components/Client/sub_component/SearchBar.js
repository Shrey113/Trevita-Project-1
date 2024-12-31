import React, { useState } from "react";
import "./CSS Files/SearchBar.css";
import searchIcon from "./../../../Assets/Client/AfterLogin/search.png";
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar">
      <div className="image_container">
        <img className="search-icon" src={searchIcon} />
      </div>

      <input type="text" id="search-bar" placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
