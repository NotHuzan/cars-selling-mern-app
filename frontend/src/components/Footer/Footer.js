import React from "react";
import "./Footer.css"; // Assuming you have some CSS file for styling
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer
      style={{
        backgroundColor: "#000000",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div className="logo">
          <div
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer", width: "10rem" }}
          >
            <img src="/footerLogo.png" alt="" />
          </div>
        </div>
        <p style={{ margin: "1rem" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          veniam amet autem sunt, perspiciatis nemo.
        </p>
        <div style={{ fontSize: "24px" }}>
          <a
            href="https://www.facebook.com"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.twitter.com"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.google.com"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="https://www.instagram.com"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com"
            style={{ color: "white", margin: "0 10px" }}
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #444",
          paddingTop: "10px",
          marginTop: "20px",
        }}
      >
        <p>Copyright &copy; 2024 cars. </p>
      </div>
    </footer>
  );
};

export default Footer;
