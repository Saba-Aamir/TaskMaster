import React from "react";
import styled, { keyframes } from "styled-components";
import colors from "../styles/colors";

const Loader = () => {

    return (
      <Container>
        <Spinner />
      </Container>
    )
}

export default Loader;

const Container = styled.div`
  position: absolute;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.span`
  width: 40px;
  height: 40px;
  border: 5px solid ${colors.accent3};
  border-top: 5px solid ${colors.accent4};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;