import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { decodeToken } from "../../../services/authenticationService";

const GoogleCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      console.log("Google OAuth2 code received:", code);

      axios
        .post(
          "http://localhost:8080/api/auth/oauth2/callback/google",
          { code },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Response from backend:", response.data);

          // Lấy token từ response
          const token = response.data.token;
          const user_name = response.data.name
          const email = response.data.email
          // Lưu token vào localStorage
          
          localStorage.setItem("token", token);
          localStorage.setItem("username", user_name);
          localStorage.setItem("email", email);
          

          // Decode token để lấy role
          decodeToken(token)
            .then((decodedData) => {
              const role = decodedData.result?.role_name;
              console.log("decode :",decodedData.result);
              localStorage.setItem("userId", decodedData.result.user_id)
              if (role === "ROLE_CUSTOMER") {
                navigate("/");
              } else {
                console.error("Unhandled role:", role);
              }
            })
            .catch((decodeError) => {
              console.error("Error decoding token:", decodeError);
            });
        })
        .catch((error) => {
          console.error("Error during Google callback:", error.response || error);
        });
    }
  }, [location, navigate]);


};

export default GoogleCallback;
