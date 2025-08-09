import React, { useState } from "react";
import { Promo } from "../../../interfaces/PromoInterface";
import styled from "@emotion/styled";
import { DeleteButton, UpdateButton } from "../../User/Component/Buttons";
import axios from "axios";
import Modal from "../../../template/Modal";
import UpdatePromoForm from "./UpdatePromoForm";

const PromoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  gap: 1vh;
`;

const PromoImage = styled.img`
  width: 350px;
  height: auto;
`;

const B_C = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2vw;
`;

const PromoList: React.FC<{ promoList: Promo[] }> = ({ promoList }) => {
  const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/promos/${id}`);
      alert("Promo deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting promo:", error);
      alert("Error deleting promo");
    }
  };

  const [choosenID, setChoosenID] = useState<number>(0);

  const handleUpdate = (id: number) => {
    setChoosenID(id);
    setUpdateFormOpen(true);
  };

  const handleCloseUpdateForm = () => {
    setUpdateFormOpen(false);
  };

  return (
    <div>
      {promoList.map((promo) => (
        <PromoCard key={promo.id}>
          <h2>{promo.promoName}</h2>
          <PromoImage src={promo.promoPictureURL} alt={promo.promoName} />
          <p>Promo Code: {promo.promoCode}</p>
          <p>
            Valid from: {promo.startFrom} to {promo.endAt}
          </p>
          <B_C>
            <DeleteButton onClick={() => handleDelete(promo.id)}>
              Delete
            </DeleteButton>
            <UpdateButton onClick={() => handleUpdate(promo.id)}>
              Update
            </UpdateButton>
          </B_C>
        </PromoCard>
      ))}
      <Modal isOpen={updateFormOpen} onClose={handleCloseUpdateForm}>
        <UpdatePromoForm id={choosenID} />
      </Modal>
    </div>
  );
};

export default PromoList;
