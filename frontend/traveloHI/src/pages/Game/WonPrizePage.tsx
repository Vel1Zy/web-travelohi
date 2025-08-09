import React, { useEffect } from "react";
import { useUser } from "../../contexts/UserProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function WonPrizePage() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const sendWinPrizeRequest = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/game/win-prize",
          {
            email: user?.email,
          }
        );

        console.log(response.data);
        alert("Congrats you have won Rp. 500.000,");
        navigate("/home");
      } catch (error) {
        console.error("Error sending win prize request:", error);
      }
    };

    sendWinPrizeRequest();
  }, []);

  return <div>WonPrizePage</div>;
}
