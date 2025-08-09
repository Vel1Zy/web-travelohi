import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flight } from "../../../interfaces/FlightInterface";
import FullPageContainer from "../../../template/FullPageContainer";
import { PageTitle, StyledButton } from "../../User/Component/Forms";
import {
  CreateButton,
  CreateButtonContainer,
} from "../../User/Component/Buttons";
import Modal from "../../../template/Modal";
import AdminCreateFlightForm from "./AdminCreateFlightForm";
import {
  Card,
  CardListContainer,
  Field,
  FlightInfo,
  Label,
  Value,
} from "../../User/Component/BasicList";

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vw;
`;

export default function AdminFlightPage() {
  const { id } = useParams();

  const [formOpen, setFormOpen] = useState(false);

  const [flightData, setFlightData] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/airline/flight/${id}`
        );
        console.log(response);
        setFlightData(response.data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };

    fetchFlightData();
  }, [id]);

  const handleOpenCreateForm = () => {
    setFormOpen(true);
  };
  const handleCloseCreateForm = () => {
    setFormOpen(false);
  };

  return (
    <FullPageContainer>
      <InnerContainer>
        <PageTitle>Flight List</PageTitle>
        <CreateButtonContainer>
          <CreateButton onClick={handleOpenCreateForm}>
            Create New Flights
          </CreateButton>
        </CreateButtonContainer>
        <Modal isOpen={formOpen} onClose={handleCloseCreateForm}>
          <AdminCreateFlightForm />
        </Modal>
        {Array.isArray(flightData) && (
          <CardListContainer>
            {flightData.map((flight) => (
              <Card key={flight.id}>
                <FlightInfo>
                  <Field>
                    <Label>Flight ID:</Label> <Value>{flight.id}</Value>
                  </Field>
                  <Field>
                    <Label>Airline ID:</Label> <Value>{flight.airlineID}</Value>
                  </Field>
                  <Field>
                    <Label>Flight Name:</Label>{" "}
                    <Value>{flight.flightName}</Value>
                  </Field>
                  <Field>
                    <Label>Airplane Code:</Label>{" "}
                    <Value>{flight.airplaneCode}</Value>
                  </Field>
                  <Field>
                    <Label>Flight Description:</Label>{" "}
                    <Value>{flight.flightDescription}</Value>
                  </Field>
                  <Field>
                    <Label>Flight Price:</Label>{" "}
                    <Value>{flight.flightPrice}</Value>
                  </Field>
                  <Field>
                    <Label>Flight Duration:</Label>{" "}
                    <Value>{flight.flightDuration}</Value>
                  </Field>
                  <Field>
                    <Label>Departure Location:</Label>{" "}
                    <Value>{flight.flightDepartureLocation}</Value>
                  </Field>
                  <Field>
                    <Label>Arrival Location:</Label>{" "}
                    <Value>{flight.flightArrivalLocation}</Value>
                  </Field>
                  <Field>
                    <Label>Departure Time:</Label>{" "}
                    <Value>{flight.flightDepartureTime}</Value>
                  </Field>
                  <Field>
                    <Label>Arrival Time:</Label>{" "}
                    <Value>{flight.flightArrivalTime}</Value>
                  </Field>
                </FlightInfo>
                {/* <StyledButton onClick={() => handleClick(flight.id)}> */}
                <StyledButton onClick={() => {}}>
                  View Flight Details
                </StyledButton>
              </Card>
            ))}
          </CardListContainer>
        )}
      </InnerContainer>
    </FullPageContainer>
  );
}
