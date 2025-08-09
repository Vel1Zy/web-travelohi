import styled from "@emotion/styled";
import React from "react";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const WhyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
  max-width: 100vw;
  width: 100%;
  font-size: 7rem;
  font-weight: 600;

  background-image: url("/why_bg.jpg");

  font-family: "Anta";
`;

const StyledText = styled.div`
  font-size: 5rem;
  font-weight: 600;
  margin-top: 20px;
  color: white;
  font-family: "anta";

  margin-bottom: 20px;

  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
`;

const S_Container = styled.div`
  display: flex;
  flex: direction
  width: 100%;
  margin-top: 3vh;
  border-radius: 10px;
  border: 1px solid #000;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1), -5px 5px 10px rgba(0, 0, 0, 0.1);
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  border-right: 2px solid #000;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: system-ui;
  padding: 1vh 2vw;
`;

const DescriptionContainer = styled.p`
  padding: 1vh 2vw;
  display: flex;
  font-family: system-ui;
  padding: 2vh 2vh;
  font-size: 1.2rem;
`;

export default function WhyTraveloHI() {
  return (
    <OuterContainer>
      <WhyContainer>
        <StyledText>TraveloHI,</StyledText>
        <StyledText>Made For Travelers</StyledText>
      </WhyContainer>
      <S_Container>
        <TitleContainer>Why TraveloHI?</TitleContainer>
        <DescriptionContainer>
          TraveloHI offers travelers an unparalleled journey infused with
          authenticity, adventure, and exceptional service. With a passion for
          exploration and a commitment to creating unforgettable experiences,
          TraveloHI meticulously crafts each itinerary to showcase the hidden
          gems and cultural richness of every destination. Whether you seek the
          thrill of adrenaline-fueled adventures, the serenity of tranquil
          landscapes, or the immersion into vibrant local cultures, TraveloHI
          ensures that every aspect of your journey exceeds expectations. Our
          expert team of travel professionals meticulously plans every detail,
          from seamless logistics to handpicked accommodations, allowing you to
          relax and indulge in the transformative power of travel. Embark on a
          voyage of discovery with TraveloHI and unlock the wonders of the world
          with confidence and ease.
        </DescriptionContainer>
      </S_Container>
    </OuterContainer>
  );
}
