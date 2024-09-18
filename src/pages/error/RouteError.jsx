import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/images/logo.png";
import Error from "../../assets/images/error.png";
import colors from "../../styles/colors";
import { devices } from "../../styles/breakpoints";
import { useRouteError } from "react-router-dom";

const RouteError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

    return (
      <Container>
        <Wrapper>
            <Header>
              <Image src={Logo} width={25} height={25} />
              <Title>Task Master</Title>
            </Header>
            <Main>
              <ErrorDetail>
                <Image src={Error} width={40} height={40} />
                <ErrorTitle>Oops!</ErrorTitle>
              </ErrorDetail>
              <ErrorSubTitle>Sorry, an unexpected error has occurred.</ErrorSubTitle>
              <ErrorDetail>
                <ErrorText>{error.status}</ErrorText>
                <Text>·</Text>
                <ErrorText>{error.statusText}</ErrorText>
              </ErrorDetail>
              <ErrorSubText>{error.data}</ErrorSubText>
              <Button onClick={() => navigate('/')}>Back to Home</Button>
            </Main>
        </Wrapper>
      </Container>
    )
}

export default RouteError;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 22px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 848px;
    @media only screen and ${devices.sm} {
      width: 100%
    }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Image = styled.img`
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-family: 'New Amsterdam'; 
  text-align: center;
  margin: 0 0 0 0.5rem;
  color: ${colors.text};
  letter-spacing: 0.05rem;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  position: relative;
  flex-direction: column;
  align-items: center;
`;

const ErrorDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 0 0.5rem;
  color: ${colors.text};
    @media only screen and ${devices.sm} {
      font-size: 2rem;
    }
`;

const ErrorSubTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  color: ${colors.text};
`;

const ErrorText = styled.h3`
  color: ${colors.accent2};
  font-size: 1.2rem;
  font-style: italic;
  font-weight: 500;
  margin: 0;
`;

const ErrorSubText = styled.h3`
  color: ${colors.accent2};
  font-size: 0.9rem;
  font-style: italic;
  font-weight: 500;
  margin: 0.5rem 0 0 0;
`;

const Text = styled.h3`
  color: ${colors.secondary};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0.5rem;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 6px;
  border: none;
  outline: 0;
  min-width: 100px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  font-size: 1rem;
  font-family: 'Roboto';
  letter-spacing: 0.05rem;
  color: #fff;
  background-color: ${colors.accent3};
  transition: background-color .2s ease;
  padding: 6px 16px;
  height: 40px;
  width: 100%;
  margin-top: 2rem;
    &:hover {
      background-color: ${colors.accent2};
    }
`;