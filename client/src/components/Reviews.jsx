import React from "react";
import "../styles/Reviews.css";

function Reviews({ data }) {
  return (
    <div class="testimonial-box-container">
      {data && data.length > 0 ? (
        data.map((review, index) => {
          return (
            <div key={index} class="testimonial-box">
              <div class="box-top">
                <div class="profile">
                  <div class="profile-img">
                    <img
                      height={"32px"}
                      width={"32px"}
                      src="./res/user.png"
                      style={{ filter: "invert(100%)" }}
                    />
                  </div>

                  <div class="name-user">
                    <strong></strong>
                    <span>{review.name}</span>
                  </div>
                </div>

                <div class="reviews">
                  {new Array(review.rating).fill("1").map((ele, indexEle) => {
                    return (
                      <img
                        key={indexEle}
                        height={"24px"}
                        width={"24px"}
                        src="/res/review.png"
                      />
                    );
                  })}
                </div>
              </div>

              <div class="client-comment">
                <p>{review.comment}</p>
              </div>
            </div>
          );
        })
      ) : (
        <h3>No Reviews Available</h3>
      )}
    </div>
  );
}

export default Reviews;
