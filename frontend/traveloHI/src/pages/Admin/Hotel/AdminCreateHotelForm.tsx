import styled from "@emotion/styled";
import React, { useState } from "react";
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

export default function AdminCreateHotelForm() {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelAddress: "",
    hotelDescription: "",
    hotelStar: 1,
  });
  const [hotelImage, setHotelImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHotelImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    let urlToSubmit = "";

    try {
      if (hotelImage) {
        const hotelImageRef = ref(storage, `promo/${hotelImage?.name}`);
        await uploadBytes(hotelImageRef, hotelImage);
        const url = await getDownloadURL(hotelImageRef);

        urlToSubmit = url;
      } else {
        return alert("No Image is Selected, please select one");
      }

      const response = await axios.post("http://localhost:8080/hotels", {
        hotelName: formData.hotelName,
        hotelPictureUrl: urlToSubmit,
        hotelAddress: formData.hotelAddress,
        hotelDescription: formData.hotelDescription,
        hotelStar: formData.hotelStar,
      });
      console.log("Response:", response.data);
      alert("Successfully added new Hotel!");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error adding new Hotel, " + error.message);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormTitle>Add New Hotel</FormTitle>
        {!hotelImage && <StyledLabel>Select The Hotel Image</StyledLabel>}
        {hotelImage && (
          <ImageContainer>
            <StyledImage src={URL.createObjectURL(hotelImage)} alt="Selected" />
          </ImageContainer>
        )}
        <StyledInput
          type="file"
          name="hotelImage"
          onChange={handleImageChange}
          placeholder="Hotel Image"
        />
        <StyledInput
          type="text"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
          placeholder="Hotel Name"
        />
        <StyledInput
          type="text"
          name="hotelAddress"
          value={formData.hotelAddress}
          onChange={handleChange}
          placeholder="Hotel Address"
        />
        <StyledInput
          type="text"
          name="hotelDescription"
          value={formData.hotelDescription}
          onChange={handleChange}
          placeholder="Hotel Description"
        />
        <StyledInput
          type="number"
          name="hotelStar"
          value={formData.hotelStar}
          onChange={handleChange}
          min="1"
          max="5"
          placeholder="Hotel Star (1-5)"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </FormContainer>
  );
}
