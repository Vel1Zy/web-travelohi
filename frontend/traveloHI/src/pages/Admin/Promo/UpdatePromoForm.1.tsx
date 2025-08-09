import axios from "axios";
import React, { useEffect, useState } from "react";
import { Promo } from "../../../interfaces/PromoInterface";
import {
  FormTitle,
  StyledButton,
  StyledForm,
  StyledInput,
} from "../../User/Component/Forms";
import { UpdatePromoFormProps } from "./UpdatePromoForm";

export const UpdatePromoForm: React.FC<UpdatePromoFormProps> = ({ id }) => {
  const [promo, setPromo] = useState<Promo | null>(null);
  const [idTemp, setIdTemp] = useState<number>(id);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/promos/${idTemp}`
        );
        setPromo(response.data.promo);
      } catch (error) {
        console.error("Error fetching promo data:", error);
      }
    };

    fetchPromoData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPromo((prevPromo: Promo | null) => ({
      ...(prevPromo as Promo),
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8080/promos/${idTemp}`, {
        // GUNAKAN INI
        promoName: promo?.promoName,
        promoCode: promo?.promoCode,
        startFrom: promo?.startFrom,
        endAt: promo?.endAt,
      });
      alert("Promo updated successfully");
    } catch (error) {
      console.error("Error updating promo:", error);
      alert("Error updating promo");
    }
  };

  if (!promo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <StyledForm>
        <FormTitle onSubmit={handleSubmit}>Update Promo</FormTitle>
        <StyledInput
          type="text"
          name="promoName"
          onChange={handleChange}
          value={promo.promoName}
          placeholder="Promo Name"
        />
        <StyledInput
          type="text"
          name="promoCode"
          onChange={handleChange}
          value={promo.promoCode}
          placeholder="Promo Code"
        />
        <StyledInput
          type="date"
          name="startFrom"
          onChange={handleChange}
          value={promo.startFrom}
          placeholder="Start Date"
        />
        <StyledInput
          type="date"
          name="endAt"
          onChange={handleChange}
          value={promo.endAt}
          placeholder="End Date"
        />
        <StyledButton type="submit">Update Promo</StyledButton>
      </StyledForm>
    </div>
  );
};
