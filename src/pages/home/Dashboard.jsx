import React, { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import { devices } from "../../styles/breakpoints";
import TaskFilters from "../../components/TaskFilters";
import TaskInput from "../../components/TaskInput";
import TaskList from "../../components/TaskList";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

    return (
      <Container>
        <Wrapper>
          <Sidebar>
            <TaskFilters />
          </Sidebar>
          <Main>
            <TaskHeader className="main">
              <Heading>Add Task</Heading>
            </TaskHeader>
            <TaskInput />
            <TaskHeader>
              <Heading>My Tasks</Heading>
              <FilterButton id="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <FilterListIcon />
              </FilterButton>
            </TaskHeader>
            <TaskList /> 
          </Main>
        </Wrapper>
        <Overlay isFilterOpen={isFilterOpen}>
          <OverlayHeader>
            <CloseButton onClick={() => setIsFilterOpen(false)}>
              <CloseIcon />
            </CloseButton>
          </OverlayHeader>
          <TaskFilters />
        </Overlay>
      </Container>
    )
}

export default Dashboard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 22px;
  margin-top: 72px;
  height: 100%;
  @media only screen and ${devices.sm} {
    margin-top: 3.5rem;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  max-width: 1280px;
  width: 90%;
  @media only screen and ${devices.sm} {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  justify-content: start;
  align-items: start;
  height: 100%;
  border-right: 2px solid ${colors.backgroundAlt};
  padding: 22px 1rem 22px 0;
  margin-right: 1rem;
  width: 200px;
  @media only screen and ${devices.sm} {
    display: none;
  }
`;

const Main = styled.div`
  height: 100%;
  padding: 22px 0;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  @media only screen and ${devices.sm} {
    form {
      width: 100%;
    }
    width: 100%;
  }
`;

const TaskHeader = styled.div`
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0 1rem;
  width: 100%;
  border-bottom: 2px solid ${colors.backgroundAlt};
  @media only screen and ${devices.sm} {
    display: flex;
  }
  &.main {
    padding-top: 0;
    border-bottom: none;
  }
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
  color: ${colors.text};
  width: 100%;
`;

const FilterButton = styled.button`
  color: ${colors.text};
  background-color: ${colors.backgroundAlt};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isFilterOpen }) => (isFilterOpen ? '0' : '-100%')};
  width: 300px;
  height: 100%;
  background-color: ${colors.background};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 10;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const OverlayHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0;
  position: absolute;
  right: 5px;
  top: 7px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;