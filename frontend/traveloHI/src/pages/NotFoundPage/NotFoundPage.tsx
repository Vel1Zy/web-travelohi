import styled from "@emotion/styled";

const StyledImage = styled.img`
  width: 100%;
  height: fit-content;
`;
export default function NotFoundPage() {
  return (
    <div>
      <StyledImage src="/404.png" alt="Page Not Found" />
    </div>
  );
}
