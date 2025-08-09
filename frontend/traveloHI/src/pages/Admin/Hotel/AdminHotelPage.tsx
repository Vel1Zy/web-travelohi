import styled from "@emotion/styled";
import React, { useState } from "react";
import Modal from "../../../template/Modal";
import FullPageContainer from "../../../template/FullPageContainer";
import AdminCreateHotelForm from "./AdminCreateHotelForm";
import AdminHotelList from "./AdminHotelList";

const InnerContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

// === TOP CONTAINER ===
const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const CreateButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #00a3e7;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin: 1vh 1vw;
  margin-right: 4vw;

  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: #0077b3;
  }
`;

export default function AdminHotelPage() {
  const [createHotelOpen, setCreateHotelOpen] = useState<boolean>(false);

  const handleOpenCreateHotelForm = () => {
    setCreateHotelOpen(true);
  };

  const handleCloseCreateHotelForm = () => {
    setCreateHotelOpen(false);
  };

  return (
    <FullPageContainer>
      <InnerContainer>
        <CreateButtonContainer>
          <CreateButton onClick={handleOpenCreateHotelForm}>
            Create Hotel
          </CreateButton>
        </CreateButtonContainer>
        <AdminHotelList></AdminHotelList>
        {createHotelOpen && (
          <Modal isOpen={createHotelOpen} onClose={handleCloseCreateHotelForm}>
            <AdminCreateHotelForm></AdminCreateHotelForm>
          </Modal>
        )}
      </InnerContainer>
    </FullPageContainer>
  );
}
