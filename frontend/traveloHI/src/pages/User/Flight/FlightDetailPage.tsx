import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageContainer from "../../../template/FullPageContainer";
import axios from "axios";
import { Field, FlightInfo, Label, Value } from "../Component/BasicList";

export default function FlightDetailPage() {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/airline/flight-list/" + id)
      .then((response) => {
        if (response.data.length > 0) setFlight(response.data[0]);
        console.log(response.data[0]);
      });
  }, []);

  return (
    <FullPageContainer>
      {flight && (
        <>
          <FlightInfo>
            <Field>
              <Label>Flight ID:</Label> <Value>{flight.id}</Value>
            </Field>
            <Field>
              <Label>Airline ID:</Label> <Value>{flight.airlineID}</Value>
            </Field>
            <Field>
              <Label>Flight Name:</Label> <Value>{flight.flightName}</Value>
            </Field>
            <Field>
              <Label>Airplane Code:</Label> <Value>{flight.airplaneCode}</Value>
            </Field>
            <Field>
              <Label>Flight Description:</Label>{" "}
              <Value>{flight.flightDescription}</Value>
            </Field>
            <Field>
              <Label>Flight Price:</Label> <Value>{flight.flightPrice}</Value>
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
        </>
      )}
    </FullPageContainer>
  );
}
