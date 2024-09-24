import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import TeaTimeImage from "../assets/images/teatime.png";

const NoTasks = () => {

    return (
      <Container>
        <Wrapper>
          <Image src={TeaTimeImage} width={200} height={200} />
          <Heading>No tasks today</Heading>
          <Subheading>Relax with a cup of tea</Subheading>
        </Wrapper>
      </Container>
    )
}

export default NoTasks;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
`;

const Heading = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.5rem;
  color: ${colors.text};
`;

const Subheading = styled.h4`
  color: ${colors.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
`;