import React, { useEffect, useState } from "react";
import { Hotel, HotelRoom } from "../../../interfaces/HotelInterface";
import axios from "axios";
import {
  HotelCard,
  HotelImage,
  HotelImageContainer,
  HotelInfoContainer,
} from "./HotelPageComponent";
import { CreateButton } from "../Component/Buttons";
import { useNavigate } from "react-router-dom";

export default function HotelList() {
  const [hotelList, setHotelList] = useState<Hotel[]>([]);
  const [hotelRoomsList, setHotelRoomsList] = useState<HotelRoom[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hotel-room-complete"
        );
        const hotels = response.data;
        setHotelList(hotels);
        console.log(response.data);
        const response2 = await axios.get("http://localhost:8080/hotel-room");
        const hotelRooms = response2.data;
        setHotelRoomsList(hotelRooms);
        console.log(response2.data);
      } catch (error) {
        console.error("Error fetching hotel rooms:", error);
      }
    };

    fetchHotelRooms();
  }, []);

  return (
    <>
      {hotelList &&
        hotelList.map((hotel) => (
          <HotelCard key={hotel.id}>
            <HotelImageContainer>
              <HotelImage src={hotel.hotelPictureUrl}></HotelImage>
            </HotelImageContainer>
            <HotelInfoContainer>
              <h2>{hotel.hotelName}</h2>
              <p>{hotel.hotelAddress}</p>
              <p>{hotel.hotelDescription}</p>
              <p>{hotel.hotelStar}</p>
              <CreateButton
                onClick={() => {
                  navigate(`/hotel-room/${hotel.id}`);
                }}
              >
                Open Details
              </CreateButton>
            </HotelInfoContainer>
          </HotelCard>
        ))}
    </>
  );
}
