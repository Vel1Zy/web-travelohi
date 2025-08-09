import React, { useEffect, useState } from "react";
import FullPageContainer from "../../../template/FullPageContainer";
import {
  CreateButton,
  CreateButtonContainer,
} from "../../User/Component/Buttons";
import Modal from "../../../template/Modal";
import AdminCreateAirlineForm from "./AdminCreateAirlineForm";
import {
  AirlineInfo,
  Card,
  CardListContainer,
  Field,
  Label,
  Value,
} from "../../User/Component/BasicList";
import {
  ImageContainer,
  PageTitle,
  StyledButton,
  StyledImage,
} from "../../User/Component/Forms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Airline } from "../../../interfaces/FlightInterface";
import styled from "@emotion/styled";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

export default function AdminAirlinePage() {
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await axios.get("http://localhost:8080/airline");
        setAirlines(response.data);
      } catch (error) {
        console.error("Error fetching airlines:", error);
      }
    };

    fetchAirlines();
  }, []);

  const [formOpen, setFormOpen] = React.useState(false);

  const handleClick = (id: number) => {
    navigate(`/admin/airline-flight/${id}`);
  };

  const handleOpenCreateForm = () => {
    setFormOpen(true);
  };
  const handleCloseCreateForm = () => {
    setFormOpen(false);
  };
  return (
    <FullPageContainer>
      <InnerContainer>
        <PageTitle>Airlines List</PageTitle>
        <CreateButtonContainer>
          <CreateButton onClick={handleOpenCreateForm}>
            Create New Airline
          </CreateButton>
        </CreateButtonContainer>
        {airlines.length === 0 && <p>No airlines found</p>}
        <CardListContainer>
          {airlines.map((airline) => (
            <Card key={airline.id}>
              <AirlineInfo>
                <ImageContainer>
                  <StyledImage src={airline.airlinePictureURL} />
                </ImageContainer>
                <Field>
                  <Label>Airline ID:</Label> <Value>{airline.id}</Value>
                </Field>
                <Field>
                  <Label>Airline Name:</Label>{" "}
                  <Value>{airline.airlineName}</Value>
                </Field>
              </AirlineInfo>
              <StyledButton onClick={() => handleClick(airline.id)}>
                View Airline Details
              </StyledButton>
            </Card>
          ))}
        </CardListContainer>

        <Modal isOpen={formOpen} onClose={handleCloseCreateForm}>
          <AdminCreateAirlineForm />
        </Modal>
      </InnerContainer>
    </FullPageContainer>
  );
}
