import styled from "@emotion/styled";
import React, { ReactNode } from "react";

const Cont = styled.div`
  width: 100%;
  padding: 1vh 1vw;
`;

type FullPageContainerProps = {
  children: ReactNode;
};

export default function FullPageContainer({
  children,
}: FullPageContainerProps) {
  return <Cont>{children}</Cont>;
}
