import styled from "@emotion/styled";

export const CardListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
`;

export const Card = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
`;

export const UserInfo = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

export const HotelInfo = styled(UserInfo)``;
export const AirlineInfo = styled(UserInfo)``;
export const FlightInfo = styled(UserInfo)``;
export const SeatInfo = styled(UserInfo)``;

export const Field = styled.div`
    margin-bottom: 5px;
`;

export const Label = styled.span`
    font-weight: bold;
`;

export const Value = styled.span`
    color: #333333;
`;

export const BanButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const CardButtonContainer = styled(BanButtonContainer)``;