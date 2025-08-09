import React, { useState } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import {
  FormTitle,
  StyledButton,
  StyledForm,
  StyledInput,
} from "../../User/Component/Forms";
import axios from "axios";
import { Flight } from "../../../interfaces/FlightInterface";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function AdminCreateFlightForm() {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<Flight>({
    id: 0,
    airlineID: parseInt(id ?? ""),
    flightName: "",
    airplaneCode: "",
    flightDescription: "",
    flightPrice: 0,
    flightDuration: "",
    flightDepartureLocation: "",
    flightArrivalLocation: "",
    flightDepartureTime: "",
    flightArrivalTime: "",
    flightSeats: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/airline/flight",
        {
          ...formData,
        }
      );
      console.log("Response:", response.data);
      alert("Successfully added new Flight!");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error adding new Flight, " + error.message);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormTitle>Add New Flight</FormTitle>
        <StyledInput
          type="text"
          name="flightName"
          value={formData.flightName}
          onChange={handleChange}
          placeholder="Flight Name"
        />
        <StyledInput
          type="text"
          name="airplaneCode"
          value={formData.airplaneCode}
          onChange={handleChange}
          placeholder="Airplane Code"
        />
        <StyledInput
          type="text"
          name="flightDescription"
          value={formData.flightDescription}
          onChange={handleChange}
          placeholder="Flight Description"
        />
        <StyledInput
          type="number"
          name="flightPrice"
          value={formData.flightPrice}
          onChange={handleChange}
          placeholder="Flight Price"
        />
        <StyledInput
          type="text"
          name="flightDuration"
          value={formData.flightDuration}
          onChange={handleChange}
          placeholder="Flight Duration"
        />
        <StyledInput
          type="text"
          name="flightDepartureLocation"
          value={formData.flightDepartureLocation}
          onChange={handleChange}
          placeholder="Flight Departure Location"
        />
        <StyledInput
          type="text"
          name="flightArrivalLocation"
          value={formData.flightArrivalLocation}
          onChange={handleChange}
          placeholder="Flight Arrival Location"
        />
        <StyledInput
          type="text"
          name="flightDepartureTime"
          value={formData.flightDepartureTime}
          onChange={handleChange}
          placeholder="Flight Departure Time"
        />
        <StyledInput
          type="text"
          name="flightArrivalTime"
          value={formData.flightArrivalTime}
          onChange={handleChange}
          placeholder="Flight Arrival Time"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}
