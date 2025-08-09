import styled from "@emotion/styled";
import WhyTraveloHI from "./WhyTraveloHI";
import ImageCarousel from "./PromoCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import FullPageContainer from "../../../template/FullPageContainer";

const HomePageContainer = styled.div`
  max-width: 100vw;
  padding: 0 20px;
`;

const T_Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const T_L_Container = styled.div`
  display: flex;
  width: 100%;
`;

const C_Break = styled.div`
  border-top: 2px solid #ff9817;
  margin: 20px 0;
`;

interface Promo {
  id: number;
  promoName: string;
  promoPictureURL: string;
  promoCode: string;
  startFrom: string;
  endAt: string;
}

export default function HomePage() {
  const [promos, setPromos] = useState<Promo[]>([]); // State to store the promos data

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/promos");
        setPromos(response.data.promos);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPromos();

    const intervalId = setInterval(() => {
      fetchPromos();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <FullPageContainer>
      <HomePageContainer>
        <T_Container>
          <T_L_Container>
            <WhyTraveloHI />
          </T_L_Container>
        </T_Container>
        <C_Break />
        <ImageCarousel promos={promos} />
      </HomePageContainer>
    </FullPageContainer>

    // <ImageCarousel></ImageCarousel>
  );
}
