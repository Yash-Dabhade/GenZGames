import React, { useEffect, useState } from "react";
import "../styles/NavBar.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Button,
  Container,
} from "@chakra-ui/react";
import CartItems from "./CartItems";
import { baseURL } from "../utils/constants";
import { checkoutHandler } from "../utils/paymentHandler";
import { getJWTToken } from "../utils/getToken";

function NavBar({ isAdmin }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const initializeCart = async () => {
    const token = sessionStorage.getItem("jwtToken");
    await axios
      .get(baseURL + "/cart/get", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let total = 0;
        if (res.data.data.cart)
          res.data.data.cart.forEach((ele) => (total += ele.price));
        setTotalBill(total);
        setCart(res.data.data.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const currInterval = setInterval(() => {
      if (sessionStorage.getItem("isLoggedIn")) {
        if (sessionStorage.getItem("user")) {
          let userObj = JSON.parse(sessionStorage.getItem("user"));
          setUser(userObj);
          initializeCart();
          clearInterval(currInterval);
        }
      }
    }, 500);
  }, []);

  const handleLogOut = async () => {
    await axios
      .get(baseURL + "/logout", {
        withCredentials: true,
      })
      .then((res) => {
        sessionStorage.clear();
        window.location.href = "/login";
      })
      .catch((err) => {
        // window.location.href = "/login";
        console.log(err);
      });
  };

  function searchFunc() {
    if (searchTerm) {
      const found = window.find(searchTerm);
      if (!found) {
        alert("Game not found!");
      }
    }
  }

  return (
    <div id="NavContainer">
      <div id="logoContainer">
        <div>
          <NavLink to="/">
            <img src="/res/logo.png" alt="" id="logoImg" />
          </NavLink>
        </div>
        <div id="searchbox" className="input">
          <div>
            <input
              type="text"
              name="search"
              id="search"
              placeholder={"Search Games "}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          <div onClick={searchFunc}>
            <img
              src="/res/magnifiying-glass.png"
              style={{ height: "32px", width: "32px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
      <div id="userUtil" onMouseEnter={initializeCart}>
        <Popover>
          {user && (
            <PopoverTrigger>
              <Button backgroundColor={"transparent"} border={"none"}>
                <img src="/res/cart.png" alt="cart" id="cart" />
              </Button>
            </PopoverTrigger>
          )}
          <Portal>
            <PopoverContent
              height="fit-content"
              width="fit-content"
              marginRight="10px"
              marginTop="20px"
              backgroundColor={"#ffffff"}
              border="1px solid white"
              borderRadius={"12px"}
              padding="20px 20px"
              position="relative"
            >
              <PopoverArrow />
              <PopoverHeader
                fontFamily={"Play"}
                fontSize={"20px"}
                fontWeight={"300"}
                textAlign={"center"}
                padding={"12px 10px"}
              >
                SHOPPING CART
              </PopoverHeader>
              <PopoverBody>
                <div id="cartBody">
                  {cart &&
                    cart.map((item, index) => {
                      return (
                        item.cover && (
                          <CartItems
                            key={index}
                            gameId={item._id}
                            coverURL={item.cover.secure_url}
                            title={item.name}
                            price={item.price}
                            initializeCart={initializeCart}
                          />
                        )
                      );
                    })}
                </div>
              </PopoverBody>
              <PopoverFooter marginTop={"12px"}>
                {cart && cart.length > 0 ? (
                  <Button
                    width="100%"
                    height={"40px"}
                    borderRadius="12px"
                    backgroundColor={"#fdb44b"}
                    fontFamily={"Play"}
                    textAlign={"center"}
                    fontWeight={700}
                    cursor={"pointer"}
                    _hover={{ bg: "gold" }}
                    onClick={() => {
                      checkoutHandler(totalBill, cart);
                    }}
                  >
                    Checkout Rs. {totalBill}
                  </Button>
                ) : (
                  <h3 style={{ textAlign: "center" }}>Cart is Empty</h3>
                )}
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>

        {user ? (
          <Popover>
            <PopoverTrigger>
              <Button backgroundColor={"transparent"} border={"none"}>
                <img
                  src={
                    user.photo && user.photo.secure_url
                      ? user.photo.secure_url
                      : "https://res.cloudinary.com/dtrq1phi9/image/upload/v1666959517/users/hitudfvisk1fkvx9boj7.jpg"
                  }
                  alt="user"
                  id="user"
                />
              </Button>
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                height="fit-content"
                width="130px"
                marginTop="20px"
                marginRight="10px"
                backgroundColor={"#ffffff"}
                border="1px solid white"
                borderRadius={"12px"}
                padding="10px 10px"
                position="relative"
              >
                <PopoverArrow />
                <PopoverBody fontSize={"14px"} width="100%">
                  <NavLink to="/profile">
                    <Container
                      width={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={"8px"}
                      height={"20%"}
                      marginBottom={"10px"}
                    >
                      <img src="./res/user.png" height={"34px"} />
                      <div
                        style={{
                          color: "black",
                          textAlign: "center",
                          padding: "10px 10px",
                          fontFamily: "Play",
                          fontWeight: "400",
                          fontSize: "18px",
                        }}
                      >
                        Profile
                      </div>
                    </Container>
                  </NavLink>

                  <NavLink to="/orders">
                    <Container
                      width={"100%"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={"8px"}
                      marginBottom={"10px"}
                      height={"20%"}
                    >
                      <img src="./res/orders.png" height={"34px"} />
                      <div
                        style={{
                          color: "black",
                          textAlign: "center",
                          padding: "10px 10px",
                          fontFamily: "Play",
                          fontWeight: "400",
                          fontSize: "18px",
                        }}
                      >
                        Orders
                      </div>
                    </Container>
                  </NavLink>

                  <Container
                    width={"100%"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={"8px"}
                    height={"20%"}
                    cursor={"pointer"}
                    onClick={handleLogOut}
                  >
                    <img src="./res/logout.png" height={"30px"} />
                    <div
                      style={{
                        color: "black",
                        textAlign: "center",
                        padding: "10px 10px",
                        fontFamily: "Play",
                        fontWeight: "400",
                        fontSize: "18px",
                      }}
                    >
                      Logout
                    </div>
                  </Container>
                </PopoverBody>
                <PopoverFooter marginTop={"12px"}></PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        ) : (
          <NavLink to="/login">
            <Button
              padding="10px 25px"
              borderRadius={"5px"}
              fontFamily={"Play"}
              backgroundColor={"#47abff"}
              color="white"
              fontSize={"15px"}
              border={"none"}
              cursor={"pointer"}
            >
              Sign In
            </Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default NavBar;
