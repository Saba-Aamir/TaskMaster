import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { devices } from "../styles/breakpoints";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {

  const navigate = useNavigate();

    return (
      <>
        <Container>
          <Wrapper>
            <Nav>
              <NavItem>
                <NavLink onClick={() => navigate('/')}>About</NavLink>
              </NavItem>
              <Separator>·</Separator>
              <NavItem>
                <NavLink onClick={() => navigate('/features')}>Features</NavLink>
              </NavItem>
              <Separator>·</Separator>
              <NavItem>
                <NavLink onClick={() => navigate('/apps')}>Apps</NavLink>
              </NavItem>
              <Separator>·</Separator>
              <NavItem>
                <NavLink onClick={() => navigate('/signin')}>Sign In</NavLink>
              </NavItem>
              <Separator>·</Separator>
              <NavItem>
                <NavLink onClick={() => navigate('/signup')}>Sign Up</NavLink>
              </NavItem>
            </Nav>
            <SocialWrapper>
              <SocialItem>
                <TwitterIcon />    
              </SocialItem>
              <SocialItem>
                <RedditIcon />
              </SocialItem>
              <SocialItem>
                <FacebookIcon />
              </SocialItem>
              <SocialItem>
                <InstagramIcon />
              </SocialItem>
            </SocialWrapper>
          </Wrapper>
          <CopyrightWrapper>
            <CopyrightText>
              <CopyrightIcon fontSize="small" style={{ marginRight: '0.25rem' }}/> {format(new Date(), 'yyyy')} TaskMaster Team
            </CopyrightText>
          </CopyrightWrapper>
        </Container>
      </>
    )
}

export default Footer;

const Container = styled.header`
  background: ${colors.background};
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, .02);
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${colors.secondary};
  margin: 0 auto;
  padding: 2rem 0;
  @media only screen and ${devices.sm} {
    width: 100%;
    flex-direction: column;
    padding: 1.5rem 0;
  }
`;

const Nav = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0;
`;

const NavItem = styled.li`
  float: left;
`;
  
  const NavLink = styled.a`
  cursor: pointer;
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 1rem;
  &:hover {
    font-weight: 600;
  }
  @media only screen and ${devices.sm} {
    margin: 0 0.5rem;
  }
`;

const Separator = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const SocialWrapper = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 0;
`;

const SocialItem = styled.li`
  cursor: pointer;
  margin: 0 0.5rem;
  align-self: center;
  display: flex;
  &:hover {
    &:nth-of-type(1) {
      color: #1DA1F2;
    }
    &:nth-of-type(2) {
      color: #FF5700;
    }
    &:nth-of-type(3) {
      color: #1877F2;
    }
    &:nth-of-type(4) {
      color: #C13584;
    }
  }
`;

const CopyrightWrapper = styled.div`
  margin-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, .12);
  max-width: 1280px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem 0;
  @media only screen and ${devices.sm} {
    width: 100%;
    padding: 1.5rem 0;
  }
`;
  
const CopyrightText = styled.span`
  font-size: 0.9rem;
  letter-spacing: .75px;
  color: ${colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;