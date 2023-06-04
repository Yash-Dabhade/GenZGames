import React, { useState, useEffect } from "react";
import { Checkbox, CheckboxGroup, filter } from "@chakra-ui/react";
import "../styles/FilterOptions.css";

function FilterOptions({ filterByCategory }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allValue, setAllValue] = useState("checked");
  const [lowerRange, setLowerRange] = useState(0);
  const [upperRange, setUpperRange] = useState(999999999);

  const handleApplyFilters = () => {
    filterByCategory(selectedCategories, lowerRange, upperRange);
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
        <label className="container">
          All
          <input
            value="all"
            onChange={handleOnChange}
            type="checkbox"
            defaultChecked={allValue}
            checked={allValue}
          />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Action
          <input onChange={handleOnChange} value="action" type="checkbox" />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Adventure
          <input onChange={handleOnChange} value="adventure" type="checkbox" />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Open World
          <input onChange={handleOnChange} value="openworld" type="checkbox" />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Arcade
          <input onChange={handleOnChange} value="arcade" type="checkbox" />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Simulation
          <input onChange={handleOnChange} value="simulation" type="checkbox" />
          <span className="checkmark"></span>
        </label>

        <label className="container">
          Strategy
          <input onChange={handleOnChange} value="strategy" type="checkbox" />
          <span className="checkmark"></span>
        </label>
      </div>

      <div id="priceTitle">
        <h3 className="title">Price Range</h3>
        <div id="innerPriceContainer">
          <div className="input">
            <input
              onChange={(e) => {
                setLowerRange(e.target.value);
              }}
              type="number"
              placeholder="Min-Price"
              id="minprice"
              autocomplete="false"
            />
          </div>

          <div className="input">
            <input
              onChange={(e) => {
                setUpperRange(e.target.value);
              }}
              type="number"
              placeholder="Max-Price"
              id="minprice"
              autocomplete="false"
            />
          </div>
        </div>
      </div>
      <button id="apply" onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
}

export default FilterOptions;
