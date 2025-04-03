import React, { useState, useEffect } from "react";
import "./Hero.css";

const Heroo = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Features to highlight about the farm
  const features = [
    {
      id: 1,
      title: "Organic Farming",
      description:
        "100% natural methods to grow the healthiest produce possible",
      icon: "🌱",
    },
    {
      id: 2,
      title: "Sustainable Practices",
      description: "Environmentally conscious farming for a better tomorrow",
      icon: "♻️",
    },
    {
      id: 3,
      title: "Farm to Table",
      description: "Direct delivery from our fields to your home",
      icon: "🚜",
    },
    {
      id: 4,
      title: "Community Supported",
      description: "Join our growing community of health-conscious consumers",
      icon: "👨‍🌾",
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Auto-rotate features every 5 seconds
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(featureInterval);
    };
  }, [features.length]);

  // Weather effect elements - enhanced for visibility
  const createRainDrops = () => {
    // Create more raindrops for better visibility
    return [...Array(30)].map((_, i) => (
      <div
        key={i}
        className="raindrop"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 1 + 1}s`,
        }}
      ></div>
    ));
  };

  return (
    <section className="hero-container">
      {/* Animated background elements */}
      <div className="weather-effects">{createRainDrops()}</div>

      <div className="wheat-decoration left"></div>
      <div className="wheat-decoration right"></div>

      <div className={`hero-content ${scrolled ? "scrolled" : ""}`}>
        <div className="hero-text-container">
          <h1 className="main-title">
            <span className="growing">Growing</span>
            <span className="excellence">Excellence</span>
          </h1>

          <p className="hero-subtitle">
            From fertile soil to your table, we're cultivating the future of
            farming
          </p>

          <div className="feature-carousel">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`feature-item ${
                  index === activeFeature ? "active" : ""
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}

            <div className="feature-indicators">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === activeFeature ? "active" : ""
                  }`}
                  onClick={() => setActiveFeature(index)}
                  aria-label={`View feature ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hero-cta">
            <a href="#products" className="cta-button primary">
              Explore Our Website
            </a>
            <a href="#about" className="cta-button secondary">
              Our Aim
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="image-container">
            <div className="main-image"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heroo;
