import React from "react";

export const LandingPage = () => {
  return (
    <>
      <section class="p-s m-s flex flex-row section">
        <div class="img-container p-s m-s br-m">
          <img
            src="../assets/quiz_home.svg"
            alt="home quiz svg"
            class="img-responsive"
          />
        </div>
        <div class="home-container p-s m-s">
          <div class="action-color p-s m-s txt-xl fw-bold">
            Welcome to Crypto Quiz
          </div>
          <div class="flex flex-center">
            <a href="./screens/login.html">
              <button class="btn txt-cursor outline-transparent border-none fw-semibold m-s">
                {" "}
                Login!{" "}
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
