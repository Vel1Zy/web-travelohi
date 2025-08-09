import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import TrademarkFooterComponent from "./FooterComponent/TrademarkFooterComponent";
import TitleDisplay from "./FooterComponent/TitleDisplay";

const StyledFooter = styled.footer`
  padding-top: 35px;
  text-align: center;
  background-color: #1c2930;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const InnerDiv = styled.div`
  padding: 20px;
`;

// === TOP PART ===

const HorizontalTopDiv = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 25px;
`;

const FooterLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.4rem;
`;

const FooterLink = styled.div`
  font-weight: normal;
  font-size: 16px;
  color: lightgray;

  &:hover {
    color: #007bff;
  }
`;

// === BOTTOM PART ===

const BottomDiv = styled.div`
  padding-top: 45px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// === FOOTER DIVIDER ===

const H_F_DIVIDER = styled.div`
  margin-top: 1.4rem;
  border: 1px solid #e5e5e5;
`;

const V_F_DIVIDER = styled.div`
  maxwidth: 0px;
  border: 1px solid #e5e5e5;
`;

// === TOP PART SECTIONING ===
const L_T_Section = styled.div`
  margin-right: 4rem;
`;
const R_T_Section = styled.div`
  margin-left: 6rem;
  display: flex;
  gap: 6rem;
`;

// === LOGO COMPONENT ===

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.4rem;
`;

const TravLogo = styled.img`
  display: flex;
  max-width: 17rem;
`;

const FooterInfo = styled.img`
  display: flex;
  max-width: 12rem;
  height: 7rem;
`;

const Footer = () => {
  const navigate = useNavigate();

  const handleOpen = (param: string) => {
    if (param === "Facebook") {
      window.open("https://web.facebook.com/traveloka.id/", "_blank");
    } else if (param === "Twitter") {
      window.open("https://twitter.com/Traveloka", "_blank");
    } else if (param === "Instagram") {
      window.open("https://www.instagram.com/traveloka.id/", "_blank");
    } else if (param === "Youtube") {
      window.open("https://www.youtube.com/Traveloka", "_blank");
    } else if (param === "TikTok") {
      window.open("https://www.tiktok.com/@traveloka", "_blank");
    } else if (param === "About Us") {
      navigate("/about-us");
    } else if (param === "Home") {
      navigate("/home");
    } else if (param === "Game") {
      navigate("/game-lobby");
    } else if (param === "Check Location") {
      navigate("/check-location");
    }
  };

  return (
    <StyledFooter>
      <InnerDiv>
        <HorizontalTopDiv>
          <L_T_Section>
            <LogoContainer>
              <TravLogo src="\w-t-logo.png" alt="Traveloka" />
              <FooterInfo src="\footer-1.png" alt="Traveloka" />
            </LogoContainer>
          </L_T_Section>
          <V_F_DIVIDER />
          <R_T_Section>
            <FooterLinkContainer>
              <TitleDisplay text="About TraveloHI" />
              <FooterLink onClick={() => handleOpen("Home")}>Home</FooterLink>
              <FooterLink onClick={() => handleOpen("About Us")}>
                About Us
              </FooterLink>
              <FooterLink onClick={() => handleOpen("Game")}>Game</FooterLink>
              <FooterLink onClick={() => handleOpen("Check Location")}>
                Check Location
              </FooterLink>
            </FooterLinkContainer>
            <FooterLinkContainer>
              <TitleDisplay text="Follow Us At" />
              <FooterLink onClick={() => handleOpen("Facebook")}>
                Facebook
              </FooterLink>
              <FooterLink onClick={() => handleOpen("Twitter")}>
                Twitter
              </FooterLink>
              <FooterLink onClick={() => handleOpen("Instagram")}>
                Instagram
              </FooterLink>
              <FooterLink onClick={() => handleOpen("Youtube")}>
                Youtube
              </FooterLink>
              <FooterLink onClick={() => handleOpen("TikTok")}>
                TikTok
              </FooterLink>
            </FooterLinkContainer>
          </R_T_Section>
        </HorizontalTopDiv>
        <H_F_DIVIDER />
        <BottomDiv>
          <TrademarkFooterComponent />
        </BottomDiv>
      </InnerDiv>
    </StyledFooter>
  );
};

export default Footer;
