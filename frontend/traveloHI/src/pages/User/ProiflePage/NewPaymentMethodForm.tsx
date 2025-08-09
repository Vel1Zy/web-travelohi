import React, { useState } from "react";
import styled from "@emotion/styled";
import { useUser } from "../../../contexts/UserProvider";
import axios from "axios";

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

interface NewPaymentFormData {
  userID: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpiredDate: string;
  cvv: string;
  bankName: string;
}

export default function NewPaymentMethodForm() {
  const { user } = useUser();
  const [formData, setFormData] = useState<NewPaymentFormData>({
    userID: user?.userID || "",
    cardNumber: "",
    cardHolderName: "",
    cardExpiredDate: "",
    cvv: "",
    bankName: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/payment-methods",
        formData
      );
      console.log("Response:", response.data);
      alert("Successfully added new payment method!");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error:", error);
      alert("Error adding new payment method, " + error.message);
    }
  };
  return (
    <OuterContainer>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>Payment Information</StyledLabel>
        <StyledInput
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
        />
        <StyledInput
          type="text"
          name="cardHolderName"
          value={formData.cardHolderName}
          onChange={handleChange}
          placeholder="Card Holder Name"
        />
        <StyledInput
          type="text"
          name="cardExpiredDate"
          value={formData.cardExpiredDate}
          onChange={handleChange}
          placeholder="Card Expiration Date"
        />
        <StyledInput
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="CVV"
        />
        <StyledInput
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          placeholder="Bank Name"
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </OuterContainer>
  );
}
