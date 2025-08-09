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
import { HotelRoom } from "../../../interfaces/HotelInterface";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

interface AdminNewHotelRoomFormProps {
  id: number;
}

const AdminNewHotelRoomForm: React.FC<AdminNewHotelRoomFormProps> = ({
  id,
}) => {
  const [formData, setFormData] = useState<HotelRoom>({
    id: 0,
    hotelId: id,
    roomName: "",
    price: "",
    roomPictureUrl: "",
    hasBreakfast: false,
    hasWifi: false,
    hasShower: false,
    hasFreeWater: false,
    hasAC: false,
    totalRoom: 0,
    availableRoom: 0,
    createdAt: "",
  });
  const [roomImage, setRoomImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRoomImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    let urlToSubmit = "";

    try {
      if (roomImage) {
        const roomImageRef = ref(storage, `rooms/${roomImage?.name}`);
        await uploadBytes(roomImageRef, roomImage);
        const url = await getDownloadURL(roomImageRef);

        urlToSubmit = url;
      } else {
        return alert("No Image is Selected, please select one");
      }

      const response = await axios.post("http://localhost:8080/hotel-room", {
        hotelId: formData.hotelId,
        roomName: formData.roomName,
        price: formData.price,
        roomPictureUrl: urlToSubmit,
        hasBreakfast: formData.hasBreakfast,
        hasWifi: formData.hasWifi,
        hasShower: formData.hasShower,
        hasFreeWater: formData.hasFreeWater,
        hasAC: formData.hasAC,
        totalRoom: parseInt(formData.totalRoom),
        availableRoom: parseInt(formData.totalRoom),
      });
      console.log("Response:", response.data);
      alert("Successfully added new Hotel Room!");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error adding new Hotel Room, " + error.message);
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormTitle>Add New Hotel Room</FormTitle>
        {!roomImage && <StyledLabel>Select The Room Image</StyledLabel>}
        {roomImage && (
          <ImageContainer>
            <StyledImage src={URL.createObjectURL(roomImage)} alt="Selected" />
          </ImageContainer>
        )}
        <StyledInput
          type="file"
          name="roomImage"
          onChange={handleImageChange}
          placeholder="Room Image"
        />
        <StyledInput
          type="text"
          name="roomName"
          value={formData.roomName}
          onChange={handleChange}
          placeholder="Room Name"
        />
        <StyledInput
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <HorizontalContainer>
          <StyledLabel>Has Breakfast</StyledLabel>
          <StyledInput
            type="checkbox"
            name="hasBreakfast"
            checked={formData.hasBreakfast}
            onChange={(e) =>
              setFormData({ ...formData, hasBreakfast: e.target.checked })
            }
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <StyledLabel>Has Wifi</StyledLabel>
          <StyledInput
            type="checkbox"
            name="hasWifi"
            checked={formData.hasWifi}
            onChange={(e) =>
              setFormData({ ...formData, hasWifi: e.target.checked })
            }
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <StyledLabel>Has Shower</StyledLabel>
          <StyledInput
            type="checkbox"
            name="hasShower"
            checked={formData.hasShower}
            onChange={(e) =>
              setFormData({ ...formData, hasShower: e.target.checked })
            }
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <StyledLabel>Has Free Water</StyledLabel>
          <StyledInput
            type="checkbox"
            name="hasFreeWater"
            checked={formData.hasFreeWater}
            onChange={(e) =>
              setFormData({ ...formData, hasFreeWater: e.target.checked })
            }
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <StyledLabel>Has AirConditioning</StyledLabel>
          <StyledInput
            type="checkbox"
            name="hasAC"
            checked={formData.hasAC}
            onChange={(e) =>
              setFormData({ ...formData, hasAC: e.target.checked })
            }
          />
        </HorizontalContainer>
        <StyledLabel>Total Room</StyledLabel>
        <StyledInput
          type="number"
          name="totalRoom"
          value={formData.totalRoom}
          onChange={handleChange}
          min="0"
          placeholder="Total Room"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </FormContainer>
  );
};

export default AdminNewHotelRoomForm;
