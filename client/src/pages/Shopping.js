import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import "../styles/Shopping.css";
import Banner from "../components/Banner";
import game1Logo from "../gamesMedia/asscreed_logo.png";
import game1Model from "../gamesMedia/asscree2.png";
import GameCard from "../components/GameCard";
import game1Cover from "../gamesMedia/codcover.png";
import game2Cover from "../gamesMedia/dbzcover.png";
import game3Cover from "../gamesMedia/watchdogscover.png";
import FilterOptions from "../components/FilterOptions";
import Footer from "../components/Footer";
import Cookies from "js-cookie";
import axios from "axios";
import { baseURL } from "../utils/constants";

function Shopping() {
  useEffect(() => {
    axios
      .get(baseURL + "/userdashboard", { withCredentials: true })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div id="Container">
      <NavBar />
      <div class="blob1"></div>
      <div class="blob2"></div>
      <div id="innerContainer">
        <div id="leftContainer">
          <FilterOptions />
        </div>
        <div id="rightContainer">
          <div id="bannerContainer">
            <Banner logo={game1Logo} model={game1Model} />
          </div>
          <div id="gamesContainer">
            <div className="game">
              <GameCard
                cover={game1Cover}
                title={"Call Of Duty 4"}
                price={"Rs. 2500"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game2Cover}
                title={"Dragon Ball Z Kai"}
                price={"Rs. 1750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game3Cover}
                title={"Watch Dogs: Legion"}
                price={"Rs. 3750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game1Cover}
                title={"Call Of Duty 4"}
                price={"Rs. 2500"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game2Cover}
                title={"Dragon Ball Z Kai"}
                price={"Rs. 1750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game3Cover}
                title={"Watch Dogs: Legion"}
                price={"Rs. 3750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game1Cover}
                title={"Call Of Duty 4"}
                price={"Rs. 2500"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game2Cover}
                title={"Dragon Ball Z Kai"}
                price={"Rs. 1750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game3Cover}
                title={"Watch Dogs: Legion"}
                price={"Rs. 3750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game1Cover}
                title={"Call Of Duty 4"}
                price={"Rs. 2500"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game2Cover}
                title={"Dragon Ball Z Kai"}
                price={"Rs. 1750"}
                platforms={"111"}
              />
            </div>
            <div className="game">
              <GameCard
                cover={game3Cover}
                title={"Watch Dogs: Legion"}
                price={"Rs. 3750"}
                platforms={"111"}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shopping;
