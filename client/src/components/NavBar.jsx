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
import game1Cover from "../gamesMedia/codcover.png";
import game2Cover from "../gamesMedia/dbzcover.png";
import game3Cover from "../gamesMedia/watchdogscover.png";
import { baseURL } from "../utils/constants";

function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setUser(JSON.parse(sessionStorage.getItem("user")));
    }
  });

  const handleLogOut = () => {
    axios
      .get(baseURL + "/logout", { withCredentials: true })
      .then((res) => {
        sessionStorage.removeItem("user");
        window.location.href = "/login";
      })
      .error((err) => {
        window.location.href = "/login";
      });
  };

  return (
    <div id="NavContainer">
      <div id="logoContainer">
        <div>
          <NavLink to="/">
            <img src="/res/logo.png" alt="" id="logoImg" />
          </NavLink>
        </div>
        <div id="searchbox" className="input">
          <input
            type="text"
            name="search"
            id="search"
            placeholder={"Search Games "}
          />
        </div>
      </div>
      <div id="userUtil">
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
                  <CartItems
                    coverURL={game1Cover}
                    title={"Call Of Duty: Cold War"}
                    price={"2500"}
                  />
                  <CartItems
                    coverURL={game2Cover}
                    title={"Dragon Ball Z: kakarot"}
                    price={"1750"}
                  />
                  <CartItems
                    coverURL={game3Cover}
                    title={"Watch Dogs: Legion"}
                    price={"3750"}
                  />
                  <CartItems
                    coverURL={game1Cover}
                    title={"Call Of Duty: Cold War"}
                    price={"2500"}
                  />
                  <CartItems
                    coverURL={game2Cover}
                    title={"Dragon Ball Z: kakarot"}
                    price={"1750"}
                  />
                  <CartItems
                    coverURL={game3Cover}
                    title={"Watch Dogs: Legion"}
                    price={"3750"}
                  />
                  <CartItems
                    coverURL={game1Cover}
                    title={"Call Of Duty: Cold War"}
                    price={"2500"}
                  />
                  <CartItems
                    coverURL={game2Cover}
                    title={"Dragon Ball Z: kakarot"}
                    price={"1750"}
                  />
                  <CartItems
                    coverURL={game3Cover}
                    title={"Watch Dogs: Legion"}
                    price={"3750"}
                  />
                </div>
              </PopoverBody>
              <PopoverFooter marginTop={"12px"}>
                <Button
                  width="100%"
                  height={"40px"}
                  borderRadius="12px"
                  backgroundColor={"#fdb44b"}
                  fontFamily={"Play"}
                  textAlign={"center"}
                  fontWeight={700}
                  cursor={"pointer"}
                >
                  Checkout Rs. 4800
                </Button>
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
