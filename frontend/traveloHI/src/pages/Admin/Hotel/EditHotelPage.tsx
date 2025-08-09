import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { storage } from "../../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  margin-top: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;

  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  max-width: 600px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #00a3e7;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0077b3;
  }
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 40px; // Increase the font size to make the label bigger
`;

type HotelFormData = {
  hotelName: string;
  yearEstablished: string;
  stars: number;
  logoPictureFile: File | null;
  logoPictureUrl: string;
};

export default function EditHotelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<HotelFormData>({
    hotelName: "",
    yearEstablished: "",
    stars: 1,
    logoPictureFile: null,
    logoPictureUrl: "",
  });
  const [newHotelPicture, setNewHotelPicture] = useState<File | null>(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/hotels/${id}`);
        const hotelData = response.data.hotel;
        setFormData({
          hotelName: hotelData.hotelName || "",
          yearEstablished: hotelData.yearEstablished || "",
          stars: hotelData.stars || 1,
          logoPictureUrl: hotelData.logoPictureUrl || "",
          logoPictureFile: null,
        });
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    if (id) fetchHotelData();
  }, [id]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name === "logoPictureFile" ? files![0] : value,
    });
  };

  const handlePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setNewHotelPicture(file);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      let pictureUrl = formData.logoPictureUrl;
      if (newHotelPicture) {
        const fileRef = ref(storage, `images/${newHotelPicture.name}`);
        await uploadBytes(fileRef, newHotelPicture);
        pictureUrl = await getDownloadURL(fileRef);
      }

      const data = new FormData();
      data.append("hotelName", formData.hotelName);
      data.append("yearEstablished", formData.yearEstablished);
      data.append("stars", String(formData.stars));
      data.append("logoPictureUrl", pictureUrl);

      await axios.put(`http://localhost:8080/hotels/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/hotel");
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  return (
    <OuterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Edit Hotel</StyledLabel>
        <StyledInput
          type="text"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
          placeholder="Hotel Name"
        />
        <StyledInput
          type="text"
          name="yearEstablished"
          value={formData.yearEstablished}
          onChange={handleChange}
          placeholder="Year Established"
        />
        <StyledInput
          type="number"
          name="stars"
          min="1"
          max="5"
          value={formData.stars}
          onChange={handleChange}
          placeholder="Stars"
        />

        {/* Display existing image if available, or the new image preview */}
        {formData.logoPictureUrl && !newHotelPicture && (
          <img
            src={formData.logoPictureUrl}
            alt="Hotel"
            style={{ maxWidth: "200px" }}
          />
        )}
        {newHotelPicture && (
          <img
            src={URL.createObjectURL(newHotelPicture)}
            alt="Hotel"
            style={{ maxWidth: "200px" }}
          />
        )}

        <StyledInput
          type="file"
          name="logoPictureFile"
          onChange={handlePictureChange}
        />
        <StyledButton type="submit">Update Hotel</StyledButton>
      </StyledForm>
    </OuterContainer>
  );
}
