import React from "react";
import img1 from "./cssfiles/3937443.jpg";
import "./cssfiles/hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1>ML Engineer Salaries Analysis</h1>
          <p>Explore the data on ML Engineer salaries from 2020 to 2024.</p>
          <p>
            Our dataset provides comprehensive insights into the job market and
            salary trends for ML Engineers over the past five years.
          </p>
          <button className="button-51">View Analytics</button>
        </div>
        <div className="hero__image-container">
          <img src={img1} alt="Hero" className="hero-img" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
