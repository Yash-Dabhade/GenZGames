import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import "../styles/FilterOptions.css";

function FilterOptions() {
  return (
    <div id="mainContainer">
      <div id="categories">
        <h3 class="title">Categories</h3>
        <label class="container">
          All
          <input value="all" type="checkbox" checked="checked" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Action
          <input value="action" type="checkbox" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Adventure
          <input value="adventure" type="checkbox" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Open World
          <input value="open world" type="checkbox" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Arcade
          <input value="arcade" type="checkbox" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Arcade
          <input value="arcade" type="checkbox" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Simulation
          <input value="simulation" type="checkbox" />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          Strategy
          <input value="strategy" type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>

      <div id="priceTitle">
        <h3 class="title">Price Range</h3>
        <div id="innerPriceContainer">
          <div class="input">
            <input
              type="number"
              placeholder="Min-Price"
              id="minprice"
              autocomplete="false"
            />
          </div>

          <div class="input">
            <input
              type="number"
              placeholder="Max-Price"
              id="minprice"
              autocomplete="false"
            />
          </div>
        </div>
      </div>
      <button id="apply">Apply Filters</button>
    </div>
  );
}

export default FilterOptions;
