import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";
import { useDispatch, useSelector } from 'react-redux';
import { setStatusFilter, setCategoryFilter, setPriorityFilter } from '../redux/slices/tasksSlice';

const TaskFilters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const priorities = useSelector((state) => state.categories.priorities);
  const statusFilter = useSelector((state) => state.tasks.statusFilter);
  const priorityFilter = useSelector((state) => state.tasks.priorityFilter);
  const categoryFilter = useSelector((state) => state.tasks.categoryFilter);

  const handleStatusChange = (value) => {
    dispatch(setStatusFilter(value));
  };

  const handleCategoryChange = (value) => {
    dispatch(setCategoryFilter(value));
  };

  const handlePriorityChange = (value) => {
    dispatch(setPriorityFilter(value));
  };

  return (
    <Container>
      <Heading>My Lists</Heading>

      <Divider/>

      <Subheading>Categories</Subheading>
      <List>
        <ListItem value="all" className={categoryFilter === "all" ? 'active' : ''} onClick={() => handleCategoryChange("all")}>All</ListItem>
        {categories.map((category) => (
          <ListItem key={category.id} value={category.name} className={categoryFilter === category.name ? 'active' : ''} onClick={() => handleCategoryChange(category.name)}>{category.name}</ListItem>
        ))}
      </List>

      <Divider/>

      <Subheading>Priorities</Subheading>
      <List>
        <ListItem value="all" className={priorityFilter === "all" ? 'active' : ''} onClick={() => handlePriorityChange("all")}>All</ListItem>
        {priorities.map((priority) => (
          <ListItem key={priority.id} value={priority.name} className={priorityFilter === priority.name ? 'active' : ''} onClick={() => handlePriorityChange(priority.name)}>{priority.name}</ListItem>
        ))}
      </List>

      <Divider/>

      <Subheading>Status</Subheading>
      <List>
        <ListItem value="all" className={statusFilter === "all" ? 'active' : ''} onClick={() => handleStatusChange("all")}>All</ListItem>
        <ListItem value="complete" className={statusFilter === "complete" ? 'active' : ''} onClick={() => handleStatusChange("complete")}>Completed</ListItem>
        <ListItem value="incomplete" className={statusFilter === "incomplete" ? 'active' : ''} onClick={() => handleStatusChange("incomplete")}>Incomplete</ListItem>
      </List>
      
    </Container>
  );
};

export default TaskFilters;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  padding-bottom: 1rem;
  color: ${colors.text};
  width: 100%;
`;

const Subheading = styled.h4`
  color: ${colors.accent2};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const ListItem = styled.li`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border-radius: 6px;
  &.active {
    background-color: ${colors.backgroundAlt};
  }
  &:hover {
    background-color: ${colors.backgroundAlt};
  }
`;

const Divider = styled.div`
  background-color: ${colors.backgroundAlt};
  width: 100%;
  height: 1px;
  margin-bottom: 1rem;
`;