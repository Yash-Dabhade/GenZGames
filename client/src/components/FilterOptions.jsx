import React, { useState, useEffect } from "react";
import { Checkbox, CheckboxGroup, filter } from "@chakra-ui/react";
import "../styles/FilterOptions.css";

function FilterOptions({ filterByCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allValue, setAllValue] = useState("checked");
  const [sortBy, setSortBy] = useState("high");

  const handleApplyFilters = () => {
    filterByCategory(selectedCategories, sortBy);
  };

  const handleOnChange = (e) => {
    let category = e.target.value;
    if (category == "all") {
      if (selectedCategories.length != 0) setAllValue("");
      else {
        setAllValue("checked");
        setSelectedCategories([]);
      }
    }
    if (new Array(...selectedCategories).indexOf(category) == -1)
      setSelectedCategories(new Array(...selectedCategories, category));
    else
      setSelectedCategories(
        new Array(...selectedCategories).filter((ele) => ele != category)
      );

    if (selectedCategories.length == 0) {
      setAllValue("checked");
    } else {
      setAllValue("");
    }
  };

  return (
    <div id="mainContainer">
      <div id="categories">
        <h3 className="title">Categories</h3>
        <div className="categoriesContainer">
          <label className="container">
            Action
            <input onChange={handleOnChange} value="action" type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="container">
            Adventure
            <input
              onChange={handleOnChange}
              value="adventure"
              type="checkbox"
            />
            <span className="checkmark"></span>
          </label>

          <label className="container">
            Open World
            <input
              onChange={handleOnChange}
              value="openworld"
              type="checkbox"
            />
            <span className="checkmark"></span>
          </label>

          <label className="container">
            Arcade
            <input onChange={handleOnChange} value="arcade" type="checkbox" />
            <span className="checkmark"></span>
          </label>

          <label className="container">
            Simulation
            <input
              onChange={handleOnChange}
              value="simulation"
              type="checkbox"
            />
            <span className="checkmark"></span>
          </label>

          <label className="container">
            Strategy
            <input onChange={handleOnChange} value="strategy" type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>

      <div id="priceTitle">
        <h3 className="title">Sort By</h3>
        <div id="innerPriceContainer">
          <form id="sortHolder">
            <div>
              <label className="sortLabel">Low to High Price</label>
              <input
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
                defaultChecked
                type="radio"
                value="low"
                placeholder="Min-Price"
                className="sortBtn"
                name="sort"
                autocomplete="false"
              />
            </div>
            <div>
              <label className="sortLabel">High to Low Price</label>
              <input
                onChange={(e) => {
                  setSortBy(e.target.value);
                }}
                value="high"
                type="radio"
                name="sort"
                placeholder="Min-Price"
                className="sortBtn"
                autocomplete="false"
              />
            </div>
          </form>
        </div>
      </div>
      <button id="apply" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default FilterOptions;
