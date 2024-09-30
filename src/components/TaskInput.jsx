import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { addTask } from "../redux/slices/tasksSlice";
import { addToast } from "../redux/slices/toastSlice";
import { addTaskToFirestore } from "../utils/firebase.utils";
import styled from "styled-components";
import { devices } from "../styles/breakpoints";
import colors from "../styles/colors";

const TaskInput = () => {
  const categories = useSelector((state) => state.categories.categories);
  const priorities = useSelector((state) => state.categories.priorities);
  const dispatch = useDispatch();

  const handleSubmit = async (values, resetForm) => {
    const taskData = {
      title: values.title,
      category: values.category,
      priority: values.priority,
    };

    try {
      const task = await addTaskToFirestore(taskData);
      const newTask = {
        ...task,
        createdAt: new Date().toISOString(),
      };
      dispatch(addTask(newTask));
      dispatch(
        addToast({ message: "Task added successfully.", type: "success" })
      );
      resetForm();
    } catch (error) {
      console.error("Error adding task:", error);
      dispatch(
        addToast({
          message: "Error adding task. Please try again.",
          type: "error",
        })
      );
    }
  };

  const TaskSchema = Yup.object().shape({
    title: Yup.string()
      .required("Task title cannot be empty.")
      .max(60, "Task title cannot be more than 60 characters."),
    category: Yup.string().required("Select a category."),
    priority: Yup.string().required("Select a priority."),
  });

  return (
    <Formik
      initialValues={{
        title: "",
        category: "",
        priority: "",
      }}
      validationSchema={TaskSchema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ errors, values, handleChange }) => (
        <Form>
          <Field>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
            {errors.title && <Error>{errors.title}</Error>}
          </Field>
          <FieldRow>
            <Select
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <Option value={""} disabled>
                Select category
              </Option>
              {categories &&
                categories.map((category) => (
                  <Option key={category.id} value={category.name}>
                    {category.name}
                  </Option>
                ))}
            </Select>
            {errors.category && (
              <Error className="mobile-view-error">{errors.category}</Error>
            )}
            <Select
              name="priority"
              value={values.priority}
              onChange={handleChange}
            >
              <Option value={""} disabled>
                Select priority
              </Option>
              {priorities &&
                priorities.map((priority) => (
                  <Option key={priority.id} value={priority.name}>
                    {priority.name}
                  </Option>
                ))}
            </Select>
            {errors.priority && (
              <Error className="mobile-view-error">{errors.priority}</Error>
            )}
            <Button type="submit">Add Task</Button>
          </FieldRow>
          <FieldRow
            style={{ justifyContent: "start" }}
            className="desktop-view"
          >
            {errors.category && (
              <Error style={{ marginRight: "0.25rem" }}>
                {errors.category}
              </Error>
            )}
            {errors.priority && <Error>{errors.priority}</Error>}
          </FieldRow>
        </Form>
      )}
    </Formik>
  );
};

export default TaskInput;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 1rem;
  @media only screen and ${devices.sm} {
    margin-bottom: 0.75rem;
  }
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .mobile-view-error {
    display: none;
  }
  @media only screen and ${devices.sm} {
    flex-direction: column;
    &.desktop-view {
      display: none;
    }
    .mobile-view-error {
      display: flex;
      align-items: center;
      justify-content: start;
      width: 100%;
      margin-top: -5px;
      margin-bottom: 0.75rem;
    }
  }
`;

const Error = styled.h3`
  color: ${colors.error};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0;
  margin-top: 0.5rem;
`;

const Input = styled.input`
  font-size: 0.9rem;
  padding: 0.6rem;
  height: 42px;
  box-sizing: border-box;
  border-radius: 6px;
  min-width: 700px;
  background-color: ${colors.backgroundAlt};
  border: none;
  &:focus {
    border: 1px solid rgba(25, 25, 25, 0.1);
    background-color: ${colors.white};
  }
  @media only screen and ${devices.sm} {
    min-width: auto;
    width: 100%;
  }
`;

const Select = styled.select`
  width: 38%;
  font-size: 0.9rem;
  padding: 0.6rem;
  height: 40px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid rgba(25, 25, 25, 0.1);
  @media only screen and ${devices.sm} {
    width: 100%;
    margin-bottom: 0.75rem;
  }
`;

const Option = styled.option``;

const Button = styled.button`
  border-radius: 6px;
  border: none;
  outline: 0;
  cursor: pointer;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  font-size: 1rem;
  font-family: "Roboto";
  letter-spacing: 0.05rem;
  color: ${colors.white};
  background-color: ${colors.accent3};
  transition: background-color 0.2s ease;
  padding: 6px 16px;
  height: 40px;
  width: 20%;
  &:hover {
    background-color: ${colors.accent2};
  }
  @media only screen and ${devices.sm} {
    width: 100%;
  }
`;
