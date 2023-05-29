import React from "react";
import "../styles/NavBar.css";
import { NavLink } from "react-router-dom";
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
} from "@chakra-ui/react";
import CartItems from "./CartItems";

function NavBar() {
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
            placeholder="Search Games"
          />
        </div>
      </div>
      <div id="userUtil">
        <Popover>
          <PopoverTrigger>
            <Button backgroundColor={"transparent"} border={"none"}>
              <img src="/res/cart.png" alt="cart" id="cart" />
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              height="fit-content"
              width="fit-content"
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
                padding={"2px 10px"}
              >
                Shopping Cart
              </PopoverHeader>
              <PopoverBody>
                <div id="cartBody">
                  <CartItems />
                  <CartItems />
                  <CartItems />
                </div>
              </PopoverBody>
              <PopoverFooter marginTop={"12px"}>
                <Button
                  width="100%"
                  height={"40px"}
                  borderRadius="12px"
                  backgroundColor={"rgb(255, 188, 20)"}
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

        <img src="/res/heart.png" alt="favourite" id="heart" />
        <img src="/res/user.jpg" alt="user" id="user" />
      </div>
    </div>
  );
}

export default NavBar;
