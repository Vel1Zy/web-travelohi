/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";
import { StyledButton, StyledForm, StyledInput } from "./User/Component/Forms";
import { getJWTFromCookie } from "../contexts/Utilities";
import ReCAPTCHA from "react-google-recaptcha";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const LoginLabel = styled.label`
  font-size: 2em;
  margin-bottom: 20px;
`;

const ForgottenAccountContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function LoginPage() {
  const navigate = useNavigate();
  function handleCaptchaChange(s: string | null) {
    if (s) setc(true);
    else setc(false);
  }
  const [c, setc] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = useUser();

  useEffect(() => {
    const jwtTokenCheck = getJWTFromCookie();
    if (jwtTokenCheck != null) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    if (!c) {
      alert("capca brok");
      return;
    }
    event.preventDefault();
    user.login(email, password);
    navigate("/home");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <OuterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <LoginLabel>Login</LoginLabel>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <ForgottenAccountContainer>
          <Link to={"/forgot-password"}>Forgot Password?</Link>
        </ForgottenAccountContainer>
        <StyledButton type="submit">Login</StyledButton>
        <StyledButton type="button" onClick={() => navigate("/login-otp")}>
          Login With OTP
        </StyledButton>
        <ReCAPTCHA
          sitekey="6LfqzYopAAAAAJCpqFBZHjf_1F0HXZ-osYedJqHJ" // Replace with your reCAPTCHA site key
          onChange={handleCaptchaChange}
        />
        <StyledButton type="button" onClick={navigateToRegister}>
          Register
        </StyledButton>
      </StyledForm>
    </OuterContainer>
  );
}
