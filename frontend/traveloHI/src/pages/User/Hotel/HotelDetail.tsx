import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HotelRoom } from "../../../interfaces/HotelInterface";
import FullPageContainer from "../../../template/FullPageContainer";
import { PageTitle } from "../Component/Forms";
import {
  Card,
  CardListContainer,
  Field,
  Label,
  UserInfo,
  Value,
} from "../Component/BasicList";
import { HotelImage } from "./HotelPageComponent";
import { CreateButton } from "../Component/Buttons";
import Modal from "../../../template/Modal";

export default function HotelDetail() {
  const { id } = useParams();
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[] | null>(null);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hotel-rooms/${id}`
        );
        setHotelRooms(response.data);
      } catch (error) {
        console.error("Error fetching hotel rooms:", error);
      }
    };

    fetchHotelRooms();
  }, [id]);

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    console.log(hotelRooms);
  }, [hotelRooms]);

  return (
    <FullPageContainer>
      <PageTitle>Hotel Rooms List</PageTitle>
      {hotelRooms && hotelRooms.length === 0 && (
        <h1>Hotel Room Not Available</h1>
      )}
      {hotelRooms && hotelRooms.length !== 0 && (
        <CardListContainer>
          {hotelRooms.map((room) => (
            <Card key={room.id}>
              <HotelImage
                src={room.roomPictureUrl}
                alt={room.roomName}
              ></HotelImage>
              <UserInfo>
                <Field>
                  <Label>Room Name:</Label> <Value>{room.roomName}</Value>
                </Field>
                <Field>
                  <Label>Price:</Label> <Value>{room.price}</Value>
                </Field>
                <Field>
                  <Label>Total Room:</Label> <Value>{room.totalRoom}</Value>
                </Field>
                <Field>
                  <Label>Room Available:</Label>{" "}
                  <Value>{room.availableRoom}</Value>
                </Field>
                <Field>
                  <Label>Has Breakfast:</Label>{" "}
                  <Value>{room.hasBreakfast === true ? "True" : "False"}</Value>
                </Field>
                <Field>
                  <Label>Has Wifi:</Label>{" "}
                  <Value>{room.hasWifi === true ? "True" : "False"}</Value>
                </Field>
                <Field>
                  <Label>Has Shower:</Label>{" "}
                  <Value>{room.hasShower === true ? "True" : "False"}</Value>
                </Field>
                <Field>
                  <Label>Has Free Water:</Label>{" "}
                  <Value>{room.hasFreeWater === true ? "True" : "False"}</Value>
                </Field>
                <Field>
                  <Label>Has AC:</Label>{" "}
                  <Value>{room.hasAC === true ? "True" : "False"}</Value>
                </Field>
                <CreateButton
                  onClick={() => {
                    navigate(`/hotel-room/detail/${room.id}`);
                  }}
                >
                  Add To Cart
                </CreateButton>
              </UserInfo>
            </Card>
          ))}
        </CardListContainer>
      )}
      <Modal isOpen={modalOpen} onClose={handleClose}></Modal>
    </FullPageContainer>
  );
}
