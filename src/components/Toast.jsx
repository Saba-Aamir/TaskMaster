import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToast } from "../redux/slices/toastSlice";
import styled from "styled-components";
import colors from "../styles/colors";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";

const Toast = () => {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  const handleRemoveToast = (index) => {
    dispatch(removeToast(index));
  };

  useEffect(() => {
    const timerIds = toasts.map((_, index) => {
      const timerId = setTimeout(() => {
        dispatch(removeToast(index));
      }, 3000);
      return timerId;
    });
    return () => {
      timerIds.forEach(clearTimeout);
    };
  }, [toasts, dispatch]);

  return (
    <ToastContainer>
      {toasts.map((toast, index) => (
        <ToastMessage key={index} type={toast.type}>
          {toast.type === "success" ? (
            <CheckCircleIcon
              sx={{ color: colors.accent1, marginRight: "0.4rem" }}
            />
          ) : toast.type === "error" ? (
            <CancelIcon sx={{ color: colors.error, marginRight: "0.4rem" }} />
          ) : (
            <InfoIcon sx={{ color: colors.primary, marginRight: "0.4rem" }} />
          )}
          <Text>{toast.message}</Text>
          <Button onClick={() => handleRemoveToast(index)}>
            <CloseIcon fontSize="small" />
          </Button>
        </ToastMessage>
      ))}
    </ToastContainer>
  );
};

export default Toast;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastMessage = styled.div`
  background-color: ${colors.white};
  border-left: 0.4rem solid
    ${(props) =>
      props.type === "error"
        ? colors.error
        : props.type === "success"
        ? colors.accent1
        : colors.primary};
  padding: 1rem 2rem 1rem 0.5rem;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  transition: opacity 0.5s;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
`;

const Text = styled.h3`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${colors.secondary};
  margin: 0;
`;

const Button = styled.button`
  color: ${colors.secondary};
  background-color: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  margin-left: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4px;
  right: 4px;
  &:hover {
    color: ${colors.text};
  }
`;
