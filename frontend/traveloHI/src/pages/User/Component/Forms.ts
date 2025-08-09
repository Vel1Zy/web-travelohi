import styled from "@emotion/styled";

export const FormTitle = styled.p`
  font-family: system-ui;
  font-size: 2rem;
  font-weight: 600;
`;

export const StyledLabel = styled.p`
font-family: system-ui;
  font-size: 1.1rem;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 30px;
  border: 2px solid black;
  text-align: center;
  margin: 70px 0;
  gap: 10px;
  border-radius: 20px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

export const StyledButton = styled.button`
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #00a3e7;
  color: white;
  cursor: pointer;
`;

// === IMAGE ===

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5vh;
`;  
export const StyledImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

export const PageTitle = styled.p`
  font-family : system-ui;
  font-size : 2rem;
`;