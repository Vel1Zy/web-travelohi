import React, { useEffect, useState } from "react";
import FullPageContainer from "../../../template/FullPageContainer";
import styled from "@emotion/styled";
import PromoList from "./PromoList";
import { Promo } from "../../../interfaces/PromoInterface";
import axios from "axios";
import Modal from "../../../template/Modal";
import NewPromoForm from "./NewPromoForm";
import {
  CreateButton,
  CreateButtonContainer,
} from "../../User/Component/Buttons";

const I_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 90vh;
`;

export const Title = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: system-ui;
`;

export default function PromoPage() {
  const [promoList, setPromoList] = useState<Promo[]>([]);
  console.log(promoList);
  const [newPromoListOpen, setNewPromoListOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPromoList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/promos");
        if (response.data.length === 0)
          return console.log("No promo available");
        setPromoList(response.data.promos);
      } catch (error) {
        console.error("Error fetching promo list:", error);
      }
    };

    fetchPromoList();
  }, []);

  const handleClose = () => {
    setNewPromoListOpen(false);
  };

  const handleOpen = () => {
    setNewPromoListOpen(true);
  };
  return (
    <FullPageContainer>
      <I_Container>
        <Title>Promo Page</Title>
        <CreateButtonContainer>
          <CreateButton onClick={handleOpen}>Add New Promo</CreateButton>
        </CreateButtonContainer>
        {promoList.length !== 0 ? (
          <PromoList promoList={promoList}></PromoList>
        ) : (
          // <PromoList promoList={promoList}></PromoList>
          <h3>No Promo Available for now, please add a new one</h3>
        )}
        <Modal isOpen={newPromoListOpen} onClose={handleClose}>
          <NewPromoForm></NewPromoForm>
        </Modal>
      </I_Container>
    </FullPageContainer>
  );
}
