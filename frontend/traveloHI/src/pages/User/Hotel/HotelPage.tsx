import styled from "@emotion/styled";
import React from "react";
import FullPageContainer from "../../../template/FullPageContainer";
import HotelList from "./HotelList";

const I_Cont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const PageTitle = styled.p`
  font-family: system-ui;
  font-size: 4vw;
  font-weight: 600;
`;

const HotelDisplayListContainer = styled.div`
  display: flex;
`;

export default function HotelPage() {
  // const [hotelData, setHotelData] = useState();

  return (
    <FullPageContainer>
      <I_Cont>
        <PageTitle>Find Your Hotel</PageTitle>
        <HotelDisplayListContainer>
          <HotelList></HotelList>
        </HotelDisplayListContainer>
      </I_Cont>
    </FullPageContainer>
  );
}
