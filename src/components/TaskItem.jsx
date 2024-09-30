import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  toggleTaskStatus,
  deleteTask,
  editTask,
} from "../redux/slices/tasksSlice";
import { addToast } from "../redux/slices/toastSlice";
import {
  updateTaskInFirestore,
  deleteTaskFromFirestore,
} from "../utils/firebase.utils";
import styled from "styled-components";
import { devices } from "../styles/breakpoints";
import colors from "../styles/colors";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ClearIcon from "@mui/icons-material/Clear";
import FlagIcon from "@mui/icons-material/Flag";
import EditIcon from "@mui/icons-material/Edit";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);
  const inputRef = useRef(null);

  const handleToggleStatus = async () => {
    try {
      await updateTaskInFirestore(task.id, { completed: !task.completed });
      dispatch(toggleTaskStatus(task.id));
      dispatch(
        addToast({
          message: task.completed
            ? "Task marked incomplete."
            : "Task marked complete.",
          type: "success",
        })
      );
    } catch (error) {
      console.error("Error updating task:", error);
      dispatch(
        addToast({
          message: "Error updating task. Please try again.",
          type: "error",
        })
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskFromFirestore(task.id);
      dispatch(deleteTask(task.id));
      dispatch(
        addToast({ message: "Task deleted successfully.", type: "success" })
      );
    } catch (error) {
      console.error("Error deleting task:", error);
      dispatch(
        addToast({
          message: "Error deleting task. Please try again.",
          type: "error",
        })
      );
    }
  };

  const handleEditSave = async () => {
    try {
      await updateTaskInFirestore(task.id, { title: editText });
      dispatch(editTask({ id: task.id, updatedTask: { title: editText } }));
      dispatch(
        addToast({ message: "Task updated successfully.", type: "success" })
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
      dispatch(
        addToast({
          message: "Error updating task. Please try again.",
          type: "error",
        })
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditText(task.title);
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  return (
    <Task className={task.completed ? "completed-task" : "task"}>
      <TaskContent>
        <TaskMarkComplete onClick={handleToggleStatus}>
          {task.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
        </TaskMarkComplete>
        {isEditing ? (
          <TaskInput
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
          />
        ) : (
          <TaskTitle onMouseEnter={() => setIsEditing(false)}>
            {task.title}
            <TaskEdit className="edit-icon" onClick={handleEditClick} />
          </TaskTitle>
        )}
      </TaskContent>
      <TaskInfo>
        <TaskCategory>{task.category}</TaskCategory>
        <FlagIcon
          sx={{
            color:
              task.priority === "Low"
                ? colors.low
                : task.priority === "Medium"
                ? colors.medium
                : colors.high,
          }}
        />
        <TaskDelete onClick={handleDelete}>
          <ClearIcon />
        </TaskDelete>
      </TaskInfo>
    </Task>
  );
};

export default TaskItem;

const Task = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0.4rem;
  width: 100%;
  border-bottom: 1px solid ${colors.backgroundAlt};
  position: relative;
  border-radius: 6px;
  &:hover {
    background-color: ${colors.backgroundAlt};
    .edit-icon {
      display: block !important;
    }
  }
  &.completed-task {
    h4 {
      color: ${colors.secondary};
      text-decoration: line-through;
    }
    background-color: ${colors.background};
  }
  @media only screen and ${devices.sm} {
    padding: 0.8rem 0.25rem;
  }
`;

const TaskContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

const TaskTitle = styled.h4`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  @media only screen and ${devices.sm} {
    font-size: 0.9rem;
  }
`;

const TaskInput = styled.input`
  font-size: 1rem;
  border: none;
  background-color: transparent;
  width: 100%;
  color: ${colors.text};
  &:focus {
    outline: none;
  }
  @media only screen and ${devices.sm} {
    font-size: 0.9rem;
  }
`;

const TaskEdit = styled(EditIcon)`
  display: none !important;
  margin-left: 0.4rem;
  color: ${colors.secondary};
  cursor: pointer;
  &:hover {
    color: ${colors.text};
  }
`;

const TaskCategory = styled.span`
  color: ${colors.white};
  background-color: ${colors.accent3};
  font-size: 0.8rem;
  font-weight: 400;
  margin: 0 0.4rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  @media only screen and ${devices.sm} {
    font-size: 0.7rem;
  }
`;

const TaskMarkComplete = styled.div`
  color: ${colors.secondary};
  cursor: pointer;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.4rem;
  &:hover {
    color: ${colors.text};
  }
  @media only screen and ${devices.sm} {
    margin-right: 0.25rem;
  }
`;

const TaskDelete = styled.button`
  color: ${colors.secondary};
  background-color: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  margin-left: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${colors.text};
  }
`;
