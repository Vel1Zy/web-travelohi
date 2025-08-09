import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HotelRoom } from "../../../interfaces/HotelInterface";
import FullPageContainer from "../../../template/FullPageContainer";
import { PageTitle } from "../../User/Component/Forms";
import styled from "@emotion/styled";
import {
  Card,
  CardListContainer,
  Field,
  Label,
  UserInfo,
  Value,
} from "../../User/Component/BasicList";
import {
  CreateButton,
  CreateButtonContainer,
} from "../../User/Component/Buttons";
import Modal from "../../../template/Modal";
import AdminNewHotelRoomForm from "./AdminNewHotelRoomForm";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminHotelRoomList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);
  const [addNewRoom, setAddNewRoom] = useState<boolean>(false);

  const handleOpenForm = () => {
    setAddNewRoom(true);
  };

  const handleCloseForm = () => {
    setAddNewRoom(false);
  };

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/hotel-rooms/${id}`
        );
        setHotelRooms(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching hotel rooms:", error);
      }
    };

    fetchHotelRooms();
  }, [id]);

  return (
    <FullPageContainer>
      <InnerContainer>
        <PageTitle>Hotel Rooms List</PageTitle>
        <CreateButtonContainer>
          <CreateButton onClick={handleOpenForm}>Add New Room</CreateButton>
        </CreateButtonContainer>
        {hotelRooms && hotelRooms.length === 0 && (
          <h1>Hotel Room Not Available</h1>
        )}
        {hotelRooms && hotelRooms.length !== 0 && (
          <CardListContainer>
            {hotelRooms.map((room) => (
              <Card key={room.id}>
                <UserInfo>
                  <Field>
                    <Label>Hotel ID:</Label> <Value>{room.id}</Value>
                  </Field>
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
                    <Value>
                      {room.hasBreakfast === true ? "True" : "False"}
                    </Value>
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
                    <Value>
                      {room.hasFreeWater === true ? "True" : "False"}
                    </Value>
                  </Field>
                  <Field>
                    <Label>Has AC:</Label>{" "}
                    <Value>{room.hasAC === true ? "True" : "False"}</Value>
                  </Field>
                </UserInfo>
              </Card>
            ))}
          </CardListContainer>
        )}
        <Modal isOpen={addNewRoom} onClose={handleCloseForm}>
          <AdminNewHotelRoomForm id={id} />
        </Modal>
      </InnerContainer>
    </FullPageContainer>
  );
};

export default AdminHotelRoomList;
