import React, { useState } from "react";
import { PaymentMethod } from "../../../interfaces/PaymentMethod";
import styled from "@emotion/styled";
import axios from "axios";
import Modal from "../../../template/Modal";
import NewPaymentMethodForm from "./NewPaymentMethodForm";
import {
  CreateButton_KhususPaymentMethod,
  DeleteButton,
} from "../Component/Buttons";

const O_Container = styled.div`
  width: 100%;
  max-width: 100%;
`;

const Payment_Card = styled.div`
  display: flex;
  margin: 2vh 3vw;
  padding: 1vh;
  max-width: 100%;
  justify-content: space-between;
  border: 2px solid #000;
  border-radius: 10px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CI_InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2vw;
`;

const CI_LabelCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const CI_ValueCol = styled.div`
  display: flex;
  flex-direction: column;
`;

// === BUTTON COMPONENT ===

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CreateButton_Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2vw
  margin-right: 3vw;
  width: 100%:

`;

const NoPaymentMethodContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2vh;
`;

const PaymentMethodsCard: React.FC<{ paymentMethods: PaymentMethod[] }> = ({
  paymentMethods,
}) => {
  const [isNewPayFormOpen, setIsNewPayFormOpen] = useState<boolean>(false);
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/payment-methods/${id}`);
      alert("Payment method deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting payment method:", error);
      alert("Error deleting payment method");
    }
  };

  const openForm = () => {
    setIsNewPayFormOpen(true);
  };

  const closeNewPayForm = () => {
    setIsNewPayFormOpen(false);
  };

  return (
    <O_Container>
      {paymentMethods.length === 0 ? (
        <>
          <NoPaymentMethodContainer>
            No Payment Method Available!!
          </NoPaymentMethodContainer>
        </>
      ) : (
        <>
          {paymentMethods.map((paymentMethod) => (
            <Payment_Card key={paymentMethod.id}>
              <CardInfo>
                <CI_InnerContainer>
                  <CI_LabelCol>
                    <label>Card Number</label>
                    <label>Card Holder Name</label>
                    <label>Card Expiry Date</label>
                    <label>CVV</label>
                    <label>Bank Name</label>
                  </CI_LabelCol>
                  <CI_ValueCol>
                    <label>:{paymentMethod.cardNumber}</label>
                    <label>:{paymentMethod.cardHolderName}</label>
                    <label>:{paymentMethod.cardExpiredDate}</label>
                    <label>:{paymentMethod.cvv}</label>
                    <label>:{paymentMethod.bankName}</label>
                  </CI_ValueCol>
                </CI_InnerContainer>
              </CardInfo>
              <ButtonContainer>
                {/* <UpdateButton onClick={() => handleUpdate(paymentMethod.id)}>
              Update
            </UpdateButton> */}
                <DeleteButton onClick={() => handleDelete(paymentMethod.id)}>
                  Delete
                </DeleteButton>
              </ButtonContainer>
            </Payment_Card>
          ))}
        </>
      )}
      <CreateButton_Container>
        <CreateButton_KhususPaymentMethod onClick={openForm}>
          Add Payment Method +
        </CreateButton_KhususPaymentMethod>
      </CreateButton_Container>
      <Modal isOpen={isNewPayFormOpen} onClose={closeNewPayForm}>
        <NewPaymentMethodForm></NewPaymentMethodForm>
      </Modal>
    </O_Container>
  );
};

export default PaymentMethodsCard;
