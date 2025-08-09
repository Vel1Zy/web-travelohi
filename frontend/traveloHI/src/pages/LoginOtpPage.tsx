import React, { useState } from "react";
import FullPageContainer from "../template/FullPageContainer";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { StyledButton, StyledInput } from "./User/Component/Forms";

const I_Cont = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border: 2px solid black;
  text-align: center;
  margin: 5vh 0;
  gap: 10px;
  border-radius: 20px;
`;

const InputtedEmailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: flex-start;
`;

const InputtedLabel = styled.div`
  font-family: system-ui;
  font-size: 1.2rem;
`;

export default function LoginOtpPage() {
  const [email, setEmail] = useState<string>("");
  const [otpInput, setOtpInput] = useState<string>("");
  const [otpField, setOtpField] = useState<boolean>(false);
  const { updateUserData } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/get-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setOtpField(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending OTP.");
    }
  };

  const handleSubmitOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailInput = email;
    const otp = otpInput;

    try {
      const response = await fetch("http://localhost:8080/login-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput, otp: otp }),
      });
      console.log(JSON.stringify({ email: emailInput, otp: otp }));

      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        document.cookie = `jwt=${data.token}; path=/`;
        updateUserData();
        navigate("/home");
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while validating OTP.");
    }
  };

  return (
    <FullPageContainer>
      <I_Cont>
        {!otpField && (
          <StyledForm onSubmit={handleSubmit}>
            <h2>Login with OTP</h2>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <StyledButton type="submit">Send OTP to Email</StyledButton>
          </StyledForm>
        )}
        {otpField && (
          <StyledForm onSubmit={handleSubmitOTP}>
            <h2>Login with OTP</h2>
            <InputtedEmailContainer>
              <InputtedLabel>Email : {email}</InputtedLabel>
            </InputtedEmailContainer>
            <StyledInput
              type="otp"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              placeholder="Insert Your OTP Code"
            />
            <StyledButton type="submit">Send OTP to Email</StyledButton>
          </StyledForm>
        )}
      </I_Cont>
    </FullPageContainer>
  );
}
