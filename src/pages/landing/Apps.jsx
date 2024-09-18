import React, { useEffect } from "react";
import styled from "styled-components";
import AppImage1 from "../../assets/images/apps1.png";
import AppImage2 from "../../assets/images/apps2.png";
import colors from "../../styles/colors";
import { devices } from "../../styles/breakpoints";

const Apps = () => {

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
              <SectionLeft style={{ marginRight: '18.65rem' }}>
                <AppTitle>Use TaskMaster</AppTitle>
                <AppTitle>on the web</AppTitle>
                <AppText>Manage your tasks from any browser and on any device.</AppText>
              </SectionLeft>
              <SectionRight>                
                <ImageWrapper>
                  <Image src={AppImage1} width={500} height={500} />
                </ImageWrapper>
              </SectionRight>
            </Main>
            <Main>
              <SectionLeft style={{ width: '47%' }}>
                <ImageWrapper>
                  <Image src={AppImage2} width={500} height={500} />
                </ImageWrapper>
              </SectionLeft>
              <SectionRight style={{ width: '50%', marginLeft: '0', alignItems: 'start' }}>
                <AppSubTitle>TaskMaster App</AppSubTitle>
                <AppText>Coming soon to Android & iOS! Seamlessly manage your tasks anytime, anywhere, on any device.</AppText>
              </SectionRight>
            </Main>
        </Wrapper>
      </Container>
    )
}

export default Apps;

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
    margin-right: 0 !important;
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
    align-items: center !important;
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

const AppTitle = styled.h1`
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

const AppSubTitle = styled.h1`
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

const AppText = styled.h3`
  color: ${colors.secondary};
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1rem 0 2rem 0;
`;