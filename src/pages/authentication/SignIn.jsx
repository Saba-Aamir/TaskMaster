import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup, auth } from "../../utils/firebase.utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../../redux/slices/userSlice";
import { addToast } from "../../redux/slices/toastSlice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { devices } from "../../styles/breakpoints";
import colors from "../../styles/colors";
import SigninImage from "../../assets/images/signin.png";
import gIcon from "../../assets/images/google.png";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (values, resetForm) => {
    dispatch(loginRequest());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      dispatch(
        loginSuccess({
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
          },
        })
      );
      dispatch(
        addToast({
          message: "Signed in successfully.",
          type: "success",
        })
      );
      resetForm();
      navigate("/dashboard");
    } catch (error) {
      dispatch(
        addToast({
          message: error.message.includes("invalid-credential")
            ? "Invalid email or password."
            : "Error signing in. Please try again.",
          type: "error",
        })
      );
      dispatch(loginFailure(error.message));
    }
  };

  const logGoogleUser = async () => {
    dispatch(loginRequest());
    const user = await signInWithGooglePopup();
    dispatch(loginSuccess({ user: { uid: user.uid, email: user.email } }));
    dispatch(
      addToast({
        message: "Signed in successfully.",
        type: "success",
      })
    );
    navigate("/dashboard");
  };

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email.")
      .required("Email cannot be empty."),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
        "Password must contain atleast 1 lowercase, 1 uppercase, 1 number and 1 special character."
      )
      .min(8, "Password must have atleast 8 Charaters.")
      .required("Password cannot be empty."),
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <Container>
      <Wrapper>
        <Main>
          <SectionLeft>
            <ImageWrapper>
              <Image src={SigninImage} width={400} height={400} />
            </ImageWrapper>
          </SectionLeft>
          <SectionRight>
            <FormTitle>Sign In</FormTitle>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SigninSchema}
              onSubmit={(values, { resetForm }) =>
                handleSignIn(values, resetForm)
              }
            >
              {({ errors, values, handleChange }) => (
                <Form>
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    {errors.email && <Error>{errors.email}</Error>}
                  </Field>
                  <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    {errors.password && <Error>{errors.password}</Error>}
                  </Field>
                  <Field>
                    <Button type="submit">Sign In</Button>
                  </Field>
                  <Field>
                    <GoogleSignIn type="button" onClick={logGoogleUser}>
                      <GoogleIcon src={gIcon} width={16} height={16} />
                      Continue with Google
                    </GoogleSignIn>
                  </Field>
                  <Field>
                    <Link onClick={() => navigate("/passwordreset")}>
                      Forgot Password
                    </Link>
                    <Text style={{ marginTop: "0.5rem" }}>
                      Don't have an account?{" "}
                      <Link
                        style={{ color: colors.accent2 }}
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
                      </Link>
                    </Text>
                  </Field>
                </Form>
              )}
            </Formik>
          </SectionRight>
        </Main>
      </Wrapper>
    </Container>
  );
};

export default SignIn;

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
  width: 848px;
  @media only screen and ${devices.sm} {
    width: 100%;
  }
`;

const Image = styled.img``;

const Main = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 20px;
  position: relative;
  @media only screen and ${devices.sm} {
    flex-direction: column;
    margin-top: 3.5rem;
    margin-bottom: 0;
  }
`;

const SectionLeft = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
`;

const SectionRight = styled.section`
  margin-left: 70px;
  width: 310px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and ${devices.sm} {
    margin-left: 0;
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;

  > img {
    @media only screen and ${devices.sm} {
      width: 300px;
      height: 300px;
    }
  }
`;

const FormTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0 0 1rem 0;
  color: ${colors.text};
  @media only screen and ${devices.sm} {
    font-size: 2rem;
    margin-top: 1rem;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;

const Label = styled.label`
  color: ${colors.text};
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Error = styled.h3`
  color: ${colors.error};
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 0;
  margin-top: 0.5rem;
`;

const Input = styled.input`
  border: 1px solid rgba(25, 25, 25, 0.1);
  font-size: 0.9rem;
  padding: 0.6rem;
  height: 40px;
  box-sizing: border-box;
  border-radius: 6px;
`;

const Button = styled.button`
  border-radius: 6px;
  border: none;
  outline: 0;
  min-width: 100px;
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
  width: 100%;
  &:hover {
    background-color: ${colors.accent2};
  }
`;

const Text = styled.h3`
  color: ${colors.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const Link = styled.a`
  color: ${colors.secondary};
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: ${colors.text};
    text-decoration: underline;
  }
`;

const GoogleSignIn = styled.button`
  border-radius: 6px;
  border: 1px solid rgba(25, 25, 25, 0.1);
  color: ${colors.text};
  background-color: ${colors.white};
  min-width: 100px;
  cursor: pointer;
  font-weight: 500;
  line-height: 1;
  font-size: 1rem;
  font-family: "Roboto";
  letter-spacing: 0.05rem;
  padding: 6px 16px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${colors.background};
  }
`;

const GoogleIcon = styled.img`
  margin-right: 0.5rem;
`;
