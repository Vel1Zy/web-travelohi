import React from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const modalOverlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const modalContentStyles = css`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const modalCloseStyles = css`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #1ba0e2;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  ${modalOverlayStyles};
`;

const ModalContent = styled.div`
  ${modalContentStyles};
`;

const CloseButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: flex-end;
`;

const ModalCloseButton = styled.button`
  ${modalCloseStyles};
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButtonContainer>
          <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
        </CloseButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
