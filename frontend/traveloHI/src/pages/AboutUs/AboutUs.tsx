import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
`;

const Paragraph = styled.p`
  color: #666;
  font-size: 16px;
  margin-bottom: 10px;
`;

const AboutUs: React.FC = () => {
  return (
    <Container>
      <Title>About Us</Title>
      <Paragraph>
        Welcome to our website! We are a team of passionate travelers who love
        exploring new destinations and sharing our experiences with others.
      </Paragraph>
      <Paragraph>
        On this website, you'll find travel guides, tips, and inspiration to
        help you plan your next adventure.
      </Paragraph>
    </Container>
  );
};

export default AboutUs;
