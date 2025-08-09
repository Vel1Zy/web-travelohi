import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

type Promo = {
  id: number;
  promoName: string;
  promoPictureURL: string;
  startFrom: string;
  endAt: string;
};

const SliderContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
`;

const Slide = styled.div`
  align-items: center;
  min-width: 100%;
  transition: all 0.5s ease;
`;

const SlideImage = styled.img`
  width: 400px;
  height: 300px;
  display: block;
  padding-left: 400px;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  border: none;
  cursor: pointer;
  font-size: 2em;
`;

const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

const NextButton = styled(NavigationButton)`
  right: 10px;
`;

export default function PromoSlider() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/promos");
        setPromos(response.data.promos);
      } catch (error) {
        console.error("Error fetching promos:", error);
      }
    };

    fetchPromos();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promos.length - 1 : prev - 1));
  };

  return (
    <SliderContainer>
      {promos.map((promo) => (
        <Slide
          key={promo.id}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <SlideImage src={promo.promoPictureURL} alt={promo.promoName} />
        </Slide>
      ))}
      <PrevButton onClick={prevSlide}>&lt;</PrevButton>
      <NextButton onClick={nextSlide}>&gt;</NextButton>
    </SliderContainer>
  );
}
