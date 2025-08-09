import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { getJWTFromCookie } from "../../contexts/Utilities";
import axios from "axios";

export default function GameLobby() {
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
          navigate("/game-testing");
        } else {
          navigate("/game-lobby");
        }
      } catch (error) {
        console.error("Error checking player:", error);
      }
    };
    checkPlayer();
  }, [user]);

  return <div>GameLobby</div>;
}
