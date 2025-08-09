import styled from "@emotion/styled";
import React from "react";

interface TextDisplayProps {
  text: string;
}
const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const TitleDisplay: React.FC<TextDisplayProps> = ({ text }) => {
  return <Title>{text}</Title>;
};

export default TitleDisplay;
