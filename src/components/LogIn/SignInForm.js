import React from "react";
import styled from "styled-components";
import firebase from "../Config/Config";
import { useForm } from "react-hook-form";

const fireAuth = firebase.auth();

export const SignIn = () => {
  const { register, handleSubmit, errors } = useForm();
  const handleAuth = data => {
    const email = data.email;
    const password = data.password;

    fireAuth.signInWithEmailAndPassword(email, password).catch(error => {
      const errCode = error.code;
      const errMessage = error.message;
      alert(
        `E-mail, password check!\n Error Code: ${errCode}\n Error Message: ${errMessage}`
      );
      console.error("E-mail, password check!", error);
    });
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        window.location.href = `/list/${uid}`;
      } else {
        return;
      }
    });
  };
  return (
    <Styles>
      <header>
        <h3>Page Title</h3>
      </header>
      <main>
        <form onSubmit={handleSubmit(handleAuth)}>
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
          <button type="button">Sign Up</button>
        </form>
      </main>
    </Styles>
  );
};

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
      background: #81ecec;
      & input {
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 15px;
        border: none;
        border-bottom: 1px solid gray;
        border-radius: 5px;
        background: none;
        :hover {
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
