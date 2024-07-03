import React, { useState, useEffect } from "react";
import "../styles/RateGame.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getJWTToken } from "../utils/getToken";

function RateGame() {
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };

  const [game, setGame] = useState(null);
  const [currentValue, setCurrentValue] = useState(0); //stars value
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");
  const stars = Array(5).fill(0);

  useEffect(() => {
    axios
      .get(baseURL + "/product/" + sessionStorage.getItem("reviewProductId"), {
        withCredentials: true,
      })
      .then((res) => {
        setGame(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = () => {
    if (currentValue == 0 || comment.length == 0) {
      toast.error("Empty Ratings and Empty Comments not allowed !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const token = sessionStorage.getItem("jwtToken");
      axios
        .post(
          baseURL + "/review",
          {
            comment,
            rating: currentValue,
            productId: sessionStorage.getItem("reviewProductId"),
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          toast.success("Review posted successfully !", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div id="RateGameContainer">
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
        theme="colored"
      />
      <div id="LeftRateGameContainer">
        <img
          src={game && game.cover.secure_url}
          alt="game"
          id="RateGameCover"
        />
      </div>
      <div id="RightRateGameContainer">
        <div style={styles.container}>
          <h2> {game && game.name} </h2>
          <div style={styles.stars}>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
          <textarea
            placeholder="What's your experience?"
            style={styles.textarea}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button style={styles.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 400,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 420,
    padding: 10,
    fontWeight: 600,
    backgroundColor: "gold",
    cursor: "pointer",
  },
};

export default RateGame;
