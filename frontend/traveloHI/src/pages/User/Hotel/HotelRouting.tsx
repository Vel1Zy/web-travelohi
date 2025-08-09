import axios from "axios";
import React, { useEffect } from "react";
import { getJWTFromCookie } from "../../../contexts/Utilities";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserProvider";

export default function HotelRouting() {
  const { user } = useUser();
  const navigate = useNavigate();
  const jwtTokenCheck = getJWTFromCookie();

  useEffect(() => {
    if (jwtTokenCheck == null) {
      alert("You must login first!!!");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const checkPlayer = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/game/check-player",
          {
            email: user?.email,
          }
        );
        console.log(response.data);
        if (response.data.exists) {
          navigate("/hotel");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking player:", error);
      }
    };
    checkPlayer();
  }, [user]);
  return <div>HotelRouting</div>;
}
