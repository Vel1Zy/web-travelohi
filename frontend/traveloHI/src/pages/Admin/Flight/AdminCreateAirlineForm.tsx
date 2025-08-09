import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  FormTitle,
  ImageContainer,
  StyledButton,
  StyledForm,
  StyledImage,
  StyledInput,
  StyledLabel,
} from "../../User/Component/Forms";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function AdminCreateAirlineForm() {
  const [formData, setFormData] = useState({
    airlineName: "",
    airlinePictureURL: "",
  });
  const [airlineImage, setAirlineImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAirlineImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    let urlToSubmit = "";

    try {
      if (airlineImage) {
        const airlineImageRef = ref(storage, `airline/${airlineImage?.name}`);
        await uploadBytes(airlineImageRef, airlineImage);
        const url = await getDownloadURL(airlineImageRef);

        urlToSubmit = url;
      } else {
        return alert("No Image is Selected, please select one");
      }

      const response = await axios.post("http://localhost:8080/airline", {
        airlineName: formData.airlineName,
        airlinePictureURL: urlToSubmit,
      });
      console.log("Response:", response.data);
      alert("Successfully added new Airline!");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error adding new Airline, " + error.message);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormTitle>Add New Airline</FormTitle>
        {!airlineImage && <StyledLabel>Select The Airline Image</StyledLabel>}
        {airlineImage && (
          <ImageContainer>
            <StyledImage
              src={URL.createObjectURL(airlineImage)}
              alt="Selected"
            />
          </ImageContainer>
        )}
        <StyledInput
          type="file"
          name="airlineImage"
          onChange={handleImageChange}
          placeholder="Airline Image"
        />
        <StyledInput
          type="text"
          name="airlineName"
          value={formData.airlineName}
          onChange={handleChange}
          placeholder="Airline Name"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}
