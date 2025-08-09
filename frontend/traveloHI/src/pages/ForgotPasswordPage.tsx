import React, { useState } from "react";
import FullPageContainer from "../template/FullPageContainer";
import { LoginLabel } from "./LoginPage";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { StyledButton, StyledForm, StyledInput } from "./User/Component/Forms";

const I_C = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Link_C = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [resetPasswordOpen, setResetPasswordOpen] = useState<boolean>(false);
  const [securityQuestion, setSecurityQuestion] = useState<string>("");
  const [securityQuestionAnswer, setSecurityQuestionAnswer] =
    useState<string>("");

  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailI = email;

    try {
      const response = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailI }),
      });

      if (response.ok) {
        const data = await response.json();
        setSecurityQuestion(data.securityQuestion);
        setResetPasswordOpen(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const handleSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          securityAnswer: securityQuestionAnswer,
          newPassword: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating password.");
    }
  };

  return (
    <FullPageContainer>
      <I_C>
        {!resetPasswordOpen && (
          <StyledForm onSubmit={handleSubmitEmail}>
            <LoginLabel>Forgot Password</LoginLabel>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <StyledButton type="submit">Submit</StyledButton>
            <Link_C>
              <p>
                Back to <Link to={"/login"}>Login</Link>
              </p>
            </Link_C>
          </StyledForm>
        )}
        {resetPasswordOpen && (
          <StyledForm onSubmit={handleSubmitNewPassword}>
            <LoginLabel>Forgot Password</LoginLabel>
            <p>{securityQuestion}</p>
            <StyledInput
              type="text"
              value={securityQuestionAnswer}
              onChange={(e) => setSecurityQuestionAnswer(e.target.value)}
              placeholder="Input Your Answer here"
            />
            <StyledInput
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Input Your New Password here"
            />
            <StyledButton type="submit">Submit</StyledButton>
            <Link_C>
              <p>
                Back to <Link to={"/login"}>Login</Link>
              </p>
            </Link_C>
          </StyledForm>
        )}
      </I_C>
    </FullPageContainer>
  );
}
