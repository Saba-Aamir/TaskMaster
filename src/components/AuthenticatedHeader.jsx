import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { addToast } from "../redux/slices/toastSlice";
import { auth } from "../utils/firebase.utils";
import styled from "styled-components";
import TMLogo from "../assets/images/logo.png";
import colors from "../styles/colors";
import { devices } from "../styles/breakpoints";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const AuthenticatedHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
        dispatch(
          addToast({ message: "Logged out successfully.", type: "success" })
        );
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
        dispatch(
          addToast({
            message: "Error logging out. Please try again.",
            type: "error",
          })
        );
      });
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Logo>
            <Image
              src={TMLogo}
              width={25}
              height={25}
              onClick={() => navigate("/")}
            />
            <Title onClick={() => navigate("/")}>Task Master</Title>
          </Logo>
          <Nav>
            <NavItem>
              <NavText>
                Welcome <NavTextBold>{user.user.email}</NavTextBold>!
              </NavText>
            </NavItem>
            <NavItem>
              <NavButton onClick={handleLogout}>Sign Out</NavButton>
            </NavItem>
          </Nav>
          <MobileNav>
            {mobileNavOpen ? (
              <CloseIcon
                fontSize="large"
                onClick={() => setMobileNavOpen(false)}
              />
            ) : (
              <MenuIcon
                fontSize="large"
                onClick={() => setMobileNavOpen(true)}
              />
            )}
          </MobileNav>
        </Wrapper>
      </Container>
      {mobileNavOpen && (
        <MobileNavList>
          <MobileNavItem>
            <NavLink
              onClick={() => {
                handleLogout();
                setMobileNavOpen(false);
              }}
            >
              Sign Out
            </NavLink>
          </MobileNavItem>
        </MobileNavList>
      )}
    </>
  );
};

export default AuthenticatedHeader;

const Container = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  font-size: 0;
  height: 72px;
  line-height: 72px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06);
  background: ${colors.white};
  @media only screen and ${devices.sm} {
    height: 56px;
    line-height: 56px;
  }
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 90%;
  display: flex;
  color: ${colors.text};
  margin: 0 auto;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1;
  > img,
  h1 {
    cursor: pointer;
  }
`;

const Image = styled.img``;

const Title = styled.h1`
  font-size: 1.8rem;
  font-family: "New Amsterdam";
  text-align: center;
  margin: 0 0 0 0.5rem;
  color: ${colors.text};
  letter-spacing: 0.05rem;
`;

const Nav = styled.ul`
  list-style: none;
  @media only screen and ${devices.sm} {
    display: none;
  }
`;

const NavItem = styled.li`
  float: left;
`;

const NavText = styled.h3`
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 1.25rem;
`;

const NavTextBold = styled.span`
  font-weight: 600;
`;

const NavLink = styled.a`
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 1.25rem;
  &:hover {
    font-weight: 600;
    box-shadow: inset 0 -2px 0 0 ${colors.accent3};
  }
`;

const NavButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 6px;
  padding: 8px 20px;
  background-color: ${colors.white};
  margin-left: 1.25rem;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  font-family: "Roboto";
  vertical-align: middle;
  &:hover {
    font-weight: 500;
    border-color: rgba(0, 0, 0, 0.56);
  }
`;

const MobileNav = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  @media only screen and ${devices.sm} {
    display: flex;
  }
`;

const MobileNavList = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 56px auto 0 auto;
  box-shadow: 0 28px 38px 0 rgba(0, 0, 0, 0.21),
    inset 0 4px 8px 0 rgba(0, 0, 0, 0.06);
  list-style: none;
  z-index: 999;
  position: fixed;
  background: ${colors.white};
  padding-left: 0;
  margin: 0;
`;

const MobileNavItem = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  > a {
    width: 100%;
    padding: 1rem 1.2rem;
    margin: 0;
  }
`;
