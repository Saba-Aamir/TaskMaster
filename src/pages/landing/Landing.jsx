import React, { useEffect } from "react";
import styled from "styled-components";
import LandingImage1 from "../../assets/images/landing1.png";
import LandingImage2 from "../../assets/images/landing2.png";
import colors from "../../styles/colors";
import { devices } from "../../styles/breakpoints";
import { useNavigate } from "react-router-dom";

const Landing = () => {

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

    return (
      <Container>
        <Wrapper>
            <Main>
              <SectionLeft>
                <LandingTitle>Stay Organized</LandingTitle>
                <LandingTitle>Stay Creative</LandingTitle>
                <LandingText>Join millions of people to capture ideas, organize life, and do something creative everyday.</LandingText>
                <LandingButton onClick={() => navigate('/signup')}>Get Started - It's Free</LandingButton>
              </SectionLeft>
              <SectionRight>                
                <ImageWrapper>
                  <Image src={LandingImage1} width={500} height={500} />
                </ImageWrapper>
              </SectionRight>
            </Main>
            <Main>
              <SectionLeft style={{ width: '40%' }}>
                <ImageWrapper>
                  <Image src={LandingImage2} width={500} height={500} />
                </ImageWrapper>
              </SectionLeft>
              <SectionRight style={{ width: '60%', marginLeft: '3rem', alignItems: 'start' }}>
                <LandingSubTitle>Organize everything in life</LandingSubTitle>
                <LandingText>Whether there is a work-related task or a personal goal, TaskMaster is here to help you manage all your to-dos.</LandingText>
              </SectionRight>
            </Main>
        </Wrapper>
      </Container>
    )
}

export default Landing;

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
  width: 90%;
    @media only screen and ${devices.sm} {
      width: 100%
    }
`;

const Image = styled.img`
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 40px;
  position: relative;
  @media only screen and ${devices.sm} {
    flex-direction: column;
    margin-top: 4.5rem;
    margin-bottom: 0;
  }
  &:nth-of-type(2) {
    @media only screen and ${devices.sm} {
      flex-direction: column-reverse;
    }
  }
`;

const SectionLeft = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 60%;
  @media only screen and ${devices.sm} {
    width: 100% !important;
    align-items: center;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const SectionRight = styled.section`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  @media only screen and ${devices.sm} {
    width: 100% !important;
    align-items: center;
    text-align: center;
    margin-left: 0 !important;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  > img {
    @media only screen and ${devices.sm} {
      width: 300px;
      height: 300px;
    }
  }
`;

const LandingTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #343a40;
  color: ${colors.text};
    @media only screen and ${devices.sm} {
      font-size: 2.2rem;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
`;

const LandingSubTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #343a40;
  color: ${colors.text};
    @media only screen and ${devices.sm} {
      font-size: 2rem;
      margin-top: 1rem;
    }
`;

const LandingText = styled.h3`
  color: ${colors.secondary};
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1rem 0 2rem 0;
`;

const LandingButton = styled.button`
  border-radius: 6px;
  border: none;
  outline: 0;
  min-width: 100px;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  font-size: 1.2rem;
  font-family: 'Roboto';
  letter-spacing: 0.05rem;
  color: #fff;
  background-color: ${colors.accent3};
  transition: background-color .2s ease;
  padding: 6px 16px;
  height: 50px;
    &:hover {
      background-color: ${colors.accent2};
    }
`;