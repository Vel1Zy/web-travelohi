import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HotelRoom } from "../../../interfaces/HotelInterface";
import {
  FormTitle,
  StyledButton,
  StyledForm,
  StyledInput,
} from "../Component/Forms";
import { useUser } from "../../../contexts/UserProvider";

interface Review {
  id: number;
  hotel_id: number;
  UserID: number;
  Review: string;
  Rating: number;
}

export default function HotelRoomDetail() {
  const [hotelRoom, setHotelRoom] = useState<HotelRoom | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const { user } = useUser();

  // Get the id parameter from the URL
  const { id } = useParams();

  useEffect(() => {
    const fetchHotelRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hotel-room/${id}`
        );
        setHotelRoom(response.data.Room);
        setReviews(response.data.Reviews);
        console.log(response.data.Reviews);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    console.log(user?.id);

    fetchHotelRoomData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleChangea = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Update the state with the new value
    setCheckInDate(value);
  };

  const handleChangeb = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    // Update the state with the new value
    setCheckOutDate(value);
  };

  const createHotelCart = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(checkInDate);
    console.log(checkOutDate);
    console.log(user?.id);
    event.preventDefault(); // Prevent default form submission behavior

    // Convert roomID to number
    const roomIdNumber = parseInt(id as string, 10);

    // // Check if CheckInDate is before CheckOutDate
    if (checkInDate >= checkOutDate) {
      console.error("CheckInDate must be before CheckOutDate");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/hotel-cart",
        {
          userID: user?.id,
          roomID: roomIdNumber, // Send roomID as number
          totalPrice: 800000,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
        },
        {
          headers: {
            "Content-Type": "application/json", // Change content type to application/json
          },
        }
      );

      console.log(user?.id);
      alert("Successfully added new Hotel Cart!");

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("error");
      throw error;
    }
  };

  return (
    <div>
      <h2>Hotel Room Detail</h2>
      {hotelRoom && (
        <div>
          <p>Room Name: {hotelRoom.roomName}</p>
          <p>Price: {hotelRoom.price ? "yes" : "no"}</p>
          <p>Has AC: {hotelRoom.hasAC ? "yes" : "no"}</p>
          <p>breakfast : {hotelRoom.hasBreakfast ? "yes" : "no"}</p>
          <p>free water : {hotelRoom.hasFreeWater ? "yes" : "no"}</p>
          <p>shower : {hotelRoom.hasShower ? "yes" : "no"}</p>
          <p>wifi : {hotelRoom.hasWifi ? "yes" : "no"}</p>
        </div>
      )}
      <h1>Reviews</h1>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>{review.review}</li>
        ))}
      </ul>

      <StyledForm onSubmit={createHotelCart}>
        <FormTitle>Add New Hotel</FormTitle>

        <StyledInput
          type="date"
          name="checkInDate"
          onChange={handleChangea}
          placeholder="Hotel Image"
        />
        <StyledInput
          type="date"
          name="checkOutDate"
          onChange={handleChangeb}
          placeholder="Hotel Name"
        />

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </div>
  );
}
