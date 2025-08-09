import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { storage } from "../../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
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
  font-size: 40px;
`;

interface PromoFormData {
  promoName: string;
  promoPictureURL: string;
  promoCode: string;
  startFrom: string;
  endAt: string;
}

export default function NewPromoForm() {
  const [formData, setFormData] = useState<PromoFormData>({
    promoName: "",
    promoPictureURL: "",
    promoCode: "",
    startFrom: "",
    endAt: "",
  });
  const [promoImage, setPromoImage] = useState<File | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPromoImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    let submitData = {
      promoName: formData.promoName,
      promoPictureURL: formData.promoPictureURL,
      promoCode: formData.promoCode,
      startFrom: formData.startFrom,
      endAt: formData.endAt,
    };

    let urlToSubmit = "";

    try {
      if (promoImage) {
        const promoImageRef = ref(storage, `promo/${promoImage?.name}`);
        await uploadBytes(promoImageRef, promoImage);
        const url = await getDownloadURL(promoImageRef);
        console.log("this is the url u got from the Firebase:", url);

        submitData.promoPictureURL = url;
        urlToSubmit = url;

        setFormData((prevState) => ({
          ...prevState,
          promoPictureURL: url,
        }));
        console.log(formData);
      } else {
        return alert("No Image is Selected, please select one");
      }

      const response = await axios.post("http://localhost:8080/promos", {
        promoName: formData.promoName,
        promoPictureURL: urlToSubmit,
        promoCode: formData.promoCode,
        startFrom: formData.startFrom,
        endAt: formData.endAt,
      });
      console.log("Response:", response.data);
      alert("Successfully added new promo!");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error adding new promo, " + error.message);
    }
  };

  useEffect(() => {}, [formData.promoPictureURL]);

  return (
    <OuterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>New Promo</StyledLabel>
        {promoImage && (
          <div>
            <img
              src={URL.createObjectURL(promoImage)}
              alt="Selected"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </div>
        )}
        <StyledInput
          type="file"
          accept="image/*" // Allow only image files
          onChange={handleImageChange} // Call handleImageChange when a file is selected
        />
        <StyledInput
          type="text"
          name="promoName"
          value={formData.promoName}
          onChange={handleChange}
          placeholder="Promo Name"
        />
        <StyledInput
          type="text"
          name="promoCode"
          value={formData.promoCode}
          onChange={handleChange}
          placeholder="Promo Code"
        />
        <StyledInput
          type="date"
          name="startFrom"
          value={formData.startFrom}
          onChange={handleChange}
          placeholder="Start From"
        />
        <StyledInput
          type="date"
          name="endAt"
          value={formData.endAt}
          onChange={handleChange}
          placeholder="End At"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </OuterContainer>
  );
}
