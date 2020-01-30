import React, { useCallback, useContext } from "react";
import { withRouter, Redirect, Link } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AuthContext } from "../AuthControl/Auth";
import { fireAuth } from "../AuthControl/Auth";

export const SignIn = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  //useCallback사용해서 Sign In Data 전송
  const handleSignIn = useCallback(
    async data => {
      const email = data.email;
      const password = data.password;
      try {
        await fireAuth.signInWithEmailAndPassword(email, password);
        history.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    [history]
  );
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    //currentUser 정보가 있으면 메인페이지로 이동
    return <Redirect to="/" />;
  }

  return (
    <Styles>
      <header>
        <h3>Project 2020-3</h3>
      </header>
      <main>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <input
            type="text"
            name="email"
            placeholder="your E-mail"
            ref={register({ required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && "E-mail is not correct"}
          <input
            type="password"
            name="password"
            placeholder="password"
            ref={register({ required: true })}
          />
          {errors.password && "Password is not correct"}
          <button type="submit">Sign In</button>
          <Link to="/signup">
            <button type="button">Sign Up</button>
          </Link>
        </form>
      </main>
    </Styles>
  );
};

export default withRouter(SignIn);

const Styles = styled.div`
  margin: 0;
  padding: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & header {
    margin: 0;
    padding: 5px;
    width: 300px;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }
  & main {
    margin: 0;
    margin-bottom: 200px;
    padding: 0;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    & form {
      width: 280px;
      height: 320px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: #81ecec;
      & input {
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 15px;
        border: none;
        border-bottom: 1px solid gray;
        border-radius: 5px;
        background: none;
        :focus {
          background: #007bff40;
          border-bottom: 2px solid #dfe6e9;
        }
      }
      & button {
        margin-top: 10px;
        width: 206.7px;
        height: 30px;
        border-radius: 5rem;
        background: #28a745;
        font-weight: bold;
        letter-spacing: 2px;
        text-transform: uppercase;
        border: 2px solid #20c997;
        color: #c4f4cf;
        :hover {
          background: #c4f4cf;
          color: #28a745;
        }
      }
    }
  }
`;
