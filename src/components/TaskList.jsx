import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import NoTasks from './NoTasks';
import styled from "styled-components";
import { devices } from "../styles/breakpoints";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const statusFilter = useSelector((state) => state.tasks.statusFilter);
  const categoryFilter = useSelector((state) => state.tasks.categoryFilter);
  const priorityFilter = useSelector((state) => state.tasks.priorityFilter);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'all' || task.completed === (statusFilter === 'complete');
    const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && categoryMatch && priorityMatch;
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [filteredTasks]);

  return (
    <TaskContainer>
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      ) : (
        <NoTasks/>
      )}
    </TaskContainer>
  );
};

export default TaskList;

const TaskContainer = styled.div`
  margin-top: 1rem;
  width: 700px;
  @media only screen and ${devices.sm} {
    width: 100%;
    margin-top: 0.2rem;
  }
`;