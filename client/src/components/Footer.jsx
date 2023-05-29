import React from "react";
import UseAnimations from "react-useanimations";
import github from "react-useanimations/lib/github";
import instagram from "react-useanimations/lib/instagram";
import linkedin from "react-useanimations/lib/linkedin";
import twitter from "react-useanimations/lib/twitter";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer__wrapper">
      <div className="footer__self_bio__wrapper">
        <div>
          <div className="footer__self_bio__container">
            <img
              width="130px"
              height="180px"
              className="footer__self_bio__container__img"
              src="/res/logoOnly.png"
              alt="Yash Dabhade"
            />
            <div className="footer__self_bio__container__text">
              <h4 className="footer__self_bio__container__title">GenZGames</h4>
              <p className="footer__self_bio__container__description">
                E/D/17, Sector 15, New Panvel <br />
                <br />
                Mumbai, Maharashtra 400088 <br />
                <br />
              </p>
              <ul className="footer__self_bio__container__social_container">
                <li>
                  <a
                    className="footer__self_bio__container__social_link"
                    href="#"
                  >
                    <UseAnimations
                      animation={instagram}
                      size={35}
                      strokeColor="white"
                      wrapperStyle={{
                        zIndex: 2000,
                        position: "relative",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    className="footer__self_bio__container__social_link"
                    href="#"
                  >
                    <UseAnimations
                      animation={twitter}
                      size={35}
                      strokeColor="white"
                      wrapperStyle={{
                        zIndex: 2000,
                        position: "relative",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    className="footer__self_bio__container__social_link"
                    href="https://github.com/Yash-Dabhade"
                  >
                    <UseAnimations
                      animation={linkedin}
                      size={35}
                      strokeColor="white"
                      wrapperStyle={{
                        zIndex: 2000,
                        position: "relative",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </li>
                <li>
                  <a
                    className="footer__self_bio__container__social_link"
                    href="https://github.com/Yash-Dabhade"
                  >
                    <UseAnimations
                      animation={github}
                      size={35}
                      strokeColor="white"
                      wrapperStyle={{
                        zIndex: 2000,
                        position: "relative",
                        cursor: "pointer",
                      }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h3 className="footer__contact__title">
            <p>Contact Us</p>
            <span
              style={{
                marginBottom: "10px",
                color: "purple",
                marginLeft: "6px",
              }}
            ></span>
          </h3>
          <div
            style={{
              gap: "40px",
            }}
            className="d-flex footer__contact__links"
          >
            <div>
              <h4>Mail Us</h4>
              <a
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  paddingBottom: "5px",
                  borderBottom: "1px solid #c4c4c4",
                  marginTop: "15px",
                }}
                href="https://mail.google.com/mail/u/0/?fs=1&to=dabhadeyash1111@gmail.com&subjectbox=test&body=helloworld&tf=cm"
              >
                genzgames283@gmail.com
              </a>
            </div>
            <div>
              <h4>Call Us</h4>
              <a
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                  paddingBottom: "5px",
                  borderBottom: "1px solid #c4c4c4",
                  marginTop: "15px",
                }}
                href="tel:7558421764"
              >
                (+91) 123456789
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "80px",
          bottom: "0px",
          borderTop: "1px solid #c4c4c4",
          marginTop: "50px",
        }}
      >
        <p
          style={{
            width: "fit-content",
            margin: "20px auto",
            display: "block",
          }}
        >
          Made with ❤️ By Yash Dabhade 2023
        </p>
      </div>
    </footer>
  );
}
