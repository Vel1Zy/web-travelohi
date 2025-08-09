import styled from "@emotion/styled";

const Button = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;
export const UpdateButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const BanUserButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const CreateButton = styled(Button)`
  background-color: #1ba0e2;
  &:hover {
    background-color: #0d7fcc;
  }
`;

export const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0vh 8vw;
  width: 90vw;
  max-width: 100%;
  margin-bottom: 2vh;
`;


export const CreateButton_KhususPaymentMethod = styled(Button)`
  margin: 2vw 3vw 2vw 0vw;
  background-color: #1ba0e2;
  &:hover {
    background-color: #0d7fcc;
  }
  font-size: 1.5vw;
`;