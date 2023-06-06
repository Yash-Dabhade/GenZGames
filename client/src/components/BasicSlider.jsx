import React from "react";
import HeroSlider, { Slide } from "hero-slider";

function BasicSlider({ photos }) {
  return (
    <HeroSlider
      slidingAnimation="left_to_right"
      orientation="horizontal"
      initialSlide={1}
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
      {photos &&
        photos.map((photo, index) => {
          return (
            <Slide
              key={photo.id}
              background={{
                backgroundImage: "url(" + photo.secure_url + ")",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          );
        })}
    </HeroSlider>
  );
}

export default BasicSlider;
