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
  margin-top: 100px;
  padding: 0;
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
    & h3 {
      margin: 0;
      letter-spacing: 3px;
      text-shadow: 2px 3px 3px rgba(255, 255, 255, 1),
        3px 4px 4px rgba(45, 52, 54, 1.5);
    }
  }
  & main {
    margin: 0;
    padding: 0;
    width: 300px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    & form {
      margin-top: 20px;
      width: 280px;
      height: 320px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: #81ecec;
      box-shadow: 3px 6px 6px rgba(0, 184, 148, 1),
        4px 7px 7px rgba(178, 190, 195, 1);
      & input {
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 15px;
        border: none;
        border-bottom: 1px solid gray;
        border-radius: 5px;
        background: none;
        :focus {
          outline: none;
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
          border: 1px solid rgba(217, 128, 250, 1);
          background: rgba(95, 39, 205, 1);
          color: rgba(200, 214, 229, 1);
        }
      }
    }
  }
`;
