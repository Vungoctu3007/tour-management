import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FacebookConfig } from "../../../config/configuration";

const LoginWithFacebook = () => {
  const navigate = useNavigate();

  const handleFacebookLogin = () => {
    const { appId } = FacebookConfig;
    const redirectUri = "http://localhost:3000/oauth2/callback/facebook";

    // URL để đăng nhập Facebook
    const facebookLoginUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=public_profile,email`;

    // Chuyển hướng tới Facebook Login
    window.location.href = facebookLoginUrl;
  };

  return (
    <button
      onClick={handleFacebookLogin}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        backgroundColor: "#4267B2",
        color: "white",
        padding: "10px 20px",
        fontSize: "16px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <i className="fa fa-facebook" style={{ fontSize: "20px" }}></i>
      Facebook
    </button>
  );
};

export default LoginWithFacebook;
