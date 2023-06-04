import React from "react";
import "../styles/GameCard.css";
import { NavLink } from "react-router-dom";
import { addToCart } from "../utils/cartHandler";

function GameCard({ gameId, cover, title, price, stock }) {
  return (
    <div id="GameContainer">
      <NavLink
        to="/details"
        onClick={() => {
          sessionStorage.setItem("selectedGame", gameId);
        }}
      >
        <img src={cover} alt="Cover" id="cover" />
        <h3 id="title">{title}</h3>
      </NavLink>
      <div id="platforms">
        <img src="/res/playstation.png" alt="" className="icon" />
        <img src="/res/monitor.png" alt="" className="icon" />
        <img src="/res/xbox.png" alt="" className="icon" />
      </div>
      <div id="buyContainer">
        <div id="price">Rs. {price}</div>
        {stock > 0 ? (
          <button
            id="buy"
            onClick={() => {
              addToCart(gameId, 1);
            }}
          >
            Add to Cart
          </button>
        ) : (
          <h4
            style={{
              textAlign: "center",
              width: "100%",
              color: "red",
              fontSize: "11px",
            }}
          >
            Game Not Available in stock
          </h4>
        )}
      </div>
    </div>
  );
}

export default GameCard;
