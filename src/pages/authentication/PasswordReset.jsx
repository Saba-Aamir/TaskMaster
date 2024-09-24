import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase.utils";
import { sendPasswordResetEmail } from "firebase/auth";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from "styled-components";
import colors from "../../styles/colors";
import { devices } from "../../styles/breakpoints";
import PasswordResetImage from "../../assets/images/signin.png";

const PasswordReset = () => {

  const navigate = useNavigate();

  const handlePasswordReset = async (values, resetForm) => {
    try {
      await sendPasswordResetEmail(auth, values.email);
      resetForm();
      alert('Follow the link sent to your email to reset the password.');
      navigate('/signin');
    }
    catch (error) {
      alert('An error occurred. Please try again.');
    }
  }

  const PasswordResetSchema = Yup.object().shape({
    email : Yup.string()
    .email('Please enter a valid email.')
    .required('Email cannot be empty.'),
  });

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
            <SectionLeft>
              <ImageWrapper>
                <Image src={PasswordResetImage} width={400} height={400} />
              </ImageWrapper>
            </SectionLeft>
            <SectionRight>
              <FormTitle>Reset Password</FormTitle>
              <Formik
                initialValues={{
                  email: '',
                }}
                validationSchema={PasswordResetSchema}
                onSubmit={(values, { resetForm }) => handlePasswordReset(values, resetForm)}
              >
              {({ errors, values, handleChange }) => (
                <Form>
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={values.email} onChange={handleChange} />
                    {errors.email && <Error>{errors.email}</Error>}
                  </Field>
                  <Field>
                    <Button type="submit">Reset Password</Button>
                  </Field>
                  <Field style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Link onClick={() => navigate('/signin')}>Back to Sign In</Link>
                    <Text style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0 0.5rem' }}> · </Text>
                    <Link onClick={() => navigate('/signup')}>Sign Up</Link>
                  </Field>
                </Form>
               )}
              </Formik>
            </SectionRight>
          </Main>
        </Wrapper>
      </Container>
    )
}

export default PasswordReset;

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
      width: 100%
    }
`;

const Image = styled.img`
`;

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
  border: 1px solid rgba(25, 25, 25, .1);
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
  font-family: 'Roboto';
  letter-spacing: 0.05rem;
  color: ${colors.white};
  background-color: ${colors.accent3};
  transition: background-color .2s ease;
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