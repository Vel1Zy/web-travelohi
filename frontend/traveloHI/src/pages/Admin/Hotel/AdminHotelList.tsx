import React, { useState, useEffect } from "react";
import axios from "axios";
import { Hotel } from "../../../interfaces/HotelInterface";
import {
  Card,
  CardListContainer,
  Field,
  HotelInfo,
  Label,
  Value,
} from "../../User/Component/BasicList";
import {
  ImageContainer,
  StyledButton,
  StyledImage,
} from "../../User/Component/Forms";
import { useNavigate } from "react-router-dom";

export default function AdminHotelList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:8080/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleClick = (id: number) => {
    navigate(`/admin/hotel/detail/${id}`);
  };

  return (
    <CardListContainer>
      {hotels.map((hotel) => (
        <Card key={hotel.id}>
          <HotelInfo>
            <ImageContainer>
              <StyledImage src={hotel.hotelPictureUrl} />
            </ImageContainer>
            <Field>
              <Label>Hotel ID:</Label> <Value>{hotel.id}</Value>
            </Field>
            <Field>
              <Label>Hotel Name:</Label> <Value>{hotel.hotelName}</Value>
            </Field>
            <Field>
              <Label>Address:</Label> <Value>{hotel.hotelAddress}</Value>
            </Field>
            <Field>
              <Label>Rating:</Label> <Value>{hotel.hotelStar}</Value>
            </Field>
          </HotelInfo>
          <StyledButton onClick={() => handleClick(hotel.id)}>
            View Hotel Details
          </StyledButton>
        </Card>
      ))}
    </CardListContainer>
  );
}
