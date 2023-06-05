import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Shopping.css";
import Banner from "../components/Banner";
import game1Logo from "../gamesMedia/asscreed_logo.png";
import game1Model from "../gamesMedia/asscree2.png";
import GameCard from "../components/GameCard";
import FilterOptions from "../components/FilterOptions";
import Footer from "../components/Footer";
import axios from "axios";
import { baseURL } from "../utils/constants";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shopping() {
  const [banner, setBanner] = useState("To be done");
  const [games, setGames] = useState([]);

  const fetchLoggedInUserDetails = async () => {
    //user details
    await axios
      .get(baseURL + "/userdashboard", { withCredentials: true })
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("cart", res.data.user.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllGames = async () => {
    await axios
      .get(baseURL + "/products", { withCredentials: true })
      .then((res) => {
        setGames(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //filter
  const filterByCategory = (categories, sortBy) => {
    if (categories && categories.length > 0) {
      console.log("Length of cateogires is : ", categories.length);
      console.log(categories);
      axios
        .post(
          baseURL + "/filteredproducts",
          { categories, sortBy },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          let categorizedProducts = res.data.categorizedProducts;
          let sortedProducts = [];
          if (categorizedProducts && categorizedProducts.length > 0) {
            if (sortBy == "low") {
              sortedProducts = categorizedProducts.sort(
                (a, b) => a.price - b.price
              );
            } else {
              sortedProducts = categorizedProducts.sort(
                (a, b) => b.price - a.price
              );
            }
            setGames(sortedProducts);
          } else {
            toast.warning("Unable to find games with given categories !", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            fetchAllGames();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchAllGames();
    }
  };

  useEffect(() => {
    fetchLoggedInUserDetails();
    fetchAllGames();
  }, []);

  return (
    <div id="Container">
      <NavBar />
      <div class="blob1"></div>
      <div class="blob2"></div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div id="innerContainer">
        <div id="leftContainer">
          <FilterOptions filterByCategory={filterByCategory} />
        </div>
        <div id="rightContainer">
          <div id="bannerContainer">
            {banner ? (
              <Banner logo={game1Logo} model={game1Model} />
            ) : (
              <Skeleton
                baseColor="transparent"
                highlightColor="gray"
                width={"100%"}
                height={"100%"}
                duration={1.3}
                enableAnimation={true}
              />
            )}
          </div>
          <div id="gamesContainer">
            {games ? (
              games.map((game) => {
                return (
                  <div key={game._id} className="game">
                    <GameCard
                      gameId={game._id}
                      cover={game.cover.secure_url}
                      title={game.name}
                      price={game.price}
                      stock={game.stock}
                    />
                  </div>
                );
              })
            ) : (
              <div style={{ width: "100%", height: "100%" }}>
                <Skeleton
                  baseColor="transparent"
                  highlightColor="gray"
                  width={"100%"}
                  height={"100%"}
                  duration={1.3}
                  enableAnimation={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shopping;
