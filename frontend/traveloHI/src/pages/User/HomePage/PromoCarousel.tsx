import React, { useState } from "react";
import styled from "@emotion/styled";
import { Promo } from "../../../interfaces/PromoInterface";

interface ImageCarouselProps {
  promos: Promo[];
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const PrevButton = styled(StyledButton)`
  left: 10px;
`;

const NextButton = styled(StyledButton)`
  right: 10px;
`;

const SlideContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ease-out 0.45s;
`;

const PromoInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: black;
  font-weight: 600;
  margin-top: 5vh;
`;

const ImageCarousel: React.FC<ImageCarouselProps> = ({ promos }) => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentPromoIndex + 1) % promos.length;
    setCurrentPromoIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentPromoIndex - 1 + promos.length) % promos.length;
    setCurrentPromoIndex(newIndex);
  };

  return (
    <Wrapper>
      <PrevButton onClick={prevSlide}>Prev</PrevButton>
      <NextButton onClick={nextSlide}>Next</NextButton>
      <SlideContainer>
        {promos.map((promo, index) => (
          <div
            key={index}
            style={{ display: index === currentPromoIndex ? "block" : "none" }}
          >
            <SlideImage src={promo.promoPictureURL} alt={`promo-${index}`} />
            <PromoInfo>
              <h3>{promo.promoName}</h3>
              <p>Promo Code: {promo.promoCode}</p>
              <p>Valid Until: {promo.endAt}</p>
            </PromoInfo>
          </div>
        ))}
      </SlideContainer>
    </Wrapper>
  );
};

export default ImageCarousel;
