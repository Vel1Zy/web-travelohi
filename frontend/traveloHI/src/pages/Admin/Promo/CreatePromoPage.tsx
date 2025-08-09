import { useState, useRef, FormEvent } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { storage } from "../../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

type PromoFormData = {
  promoName: string;
  promoPictureURL: string;
  startFrom: string;
  endAt: string;
};

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

export default function CreatePromoPage() {
  const [formData, setFormData] = useState<PromoFormData>({
    promoName: "",
    promoPictureURL: "",
    startFrom: "",
    endAt: "",
  });
  const picture = useRef<File | null>(null);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      picture.current = event.target.files[0];
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const submitData = {
      ...formData,
      promoPictureURL: "",
    };

    console.log(submitData);
    try {
      if (picture.current) {
        const storageRef = ref(
          storage,
          `promos/${picture.current.name}_${Date.now()}`
        );
        console.log("this is the current date:", Date.now());
        await uploadBytes(storageRef, picture.current);
        const url = await getDownloadURL(storageRef);
        console.log("this is the url u got from the Firebase:", url);
        submitData.promoPictureURL = url;
      }

      const response = await axios.post(
        "http://localhost:8080/promos",
        submitData
      );
      console.log(response.data);

      navigate("/admin/promo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <OuterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Add New Promo</StyledLabel>
        <StyledInput
          type="text"
          name="promoName"
          value={formData.promoName}
          onChange={handleChange}
          placeholder="Promo Name"
        />
        <StyledInput
          type="text"
          name="startFrom"
          value={formData.startFrom}
          onChange={handleChange}
          placeholder="Start From"
        />
        <StyledInput
          type="text"
          name="endAt"
          value={formData.endAt}
          onChange={handleChange}
          placeholder="End At"
        />
        {picture.current && (
          <img src={URL.createObjectURL(picture.current)} alt="Promo" />
        )}
        <StyledInput
          type="file"
          name="promoPicture"
          onChange={handlePictureChange}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </OuterContainer>
  );
}
