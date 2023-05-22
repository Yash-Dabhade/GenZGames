import React from "react";
import HeroSlider, { Slide } from "hero-slider";

//data
import one from "../gamesMedia/cod_ss_1.jpg";
import two from "../gamesMedia/cod_ss_2.jpg";
import three from "../gamesMedia/cod_ss_3.jpg";
import four from "../gamesMedia/cod_ss_4.jpg";

function BasicSlider() {
  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
      onBeforeChange={(previousSlide, nextSlide) =>
        console.log("onBeforeChange", previousSlide, nextSlide)
      }
      onChange={(nextslide) => console.log("onChange", nextslide)}
      onAfterChange={(nextSlide) => console.log("onAfterchange", nextSlide)}
      style={{
        borderRadius: "12px",
        backgroundColor: "rgba(0,0,0,0.33)",
      }}
      settings={{
        slidingDuration: 250,
        slidingDelay: 100,
        shouldAutoplay: true,
        shouldDisplayButtons: true,
        autoplayDuration: 850,
        autoplayDebounce: 850,
        height: "100%",
      }}
    >
      <Slide
        background={{
          backgroundImage: "url(" + one + ")",
          backgroundAttachment: "fixed",
        }}
      />
      <Slide
        background={{
          backgroundImage: "url(" + two + ")",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Slide
        background={{
          backgroundImage: "url(" + three + ")",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <Slide
        background={{
          backgroundImage: "url(" + four + ")",
          backgroundAttachment: "fixed",
        }}
      />
    </HeroSlider>
  );
}

export default BasicSlider;
