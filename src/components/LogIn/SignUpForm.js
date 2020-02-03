import React, { useCallback } from "react";
import styled from "styled-components";
import { fireAuth, AuthContext } from "../AuthControl/Auth";
import firebase from "../Config/Config";
import { useForm } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";

export const SignUp = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();

  //useCallback사용해서 계정생성정보 전달
  const handelAuth = useCallback(
    async data => {
      console.log(data);
      const name = data.userName;
      const email = data.userEmail;
      const password = data.userPassword;
      try {
        await fireAuth
          .createUserWithEmailAndPassword(email, password)
          .then(user => {
            const userInfo = user;
            //계정생성정보 firebase Auth에 전달함과 동시
            //firestore collection지정해서 저장
            const db = firebase.firestore();
            const dbRef = db.collection("User").doc(userInfo.user.uid);
            dbRef.set({
              User_ID: userInfo.user.uid,
              User_Name: name,
              UserEmail: userInfo.user.email,
              UserDep: data.Department,
              UserRank: data.rank,
              SignUpAt: userInfo.user.metadata.creationTime
            });
          })
          .catch(error => {
            console.error(`'${error.code}'`, error);
            alert(`'${error.message}'`);
          });
        history.push("/");
      } catch (error) {
        alert(error.message);
      }
    },
    [history]
  );
  const { currentUser } = React.useContext(AuthContext);
  if (currentUser) {
    //currentUser 정보가 있으면 메인페이지로 이동
    return <Redirect to="/" />;
  }
  return (
    <Styles>
      <header>
        <h4>Sign Up</h4>
      </header>
      <main>
        <form onSubmit={handleSubmit(handelAuth)}>
          <section>
            <label className="name">
              User Name{" "}
              <input
                name="userName"
                placeholde="user name"
                ref={register({ required: true })}
              />
              {errors.userName && "Insert user name"}
            </label>
            <label className="email">
              User E-mail{" "}
              <input
                name="userEmail"
                placeholde="user e-mail"
                ref={register({
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
              />
              {errors.userEmail && "Not Valid E-mail"}
            </label>
            <label className="password">
              User Password{" "}
              <input
                type="password"
                name="userPassword"
                placeholde="password"
                ref={register({
                  required: true,
                  pattern: /^(?=.*[a-zA-z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/
                })}
              />
              {errors.userPassword && "Not Valid Password"}
            </label>
          </section>
          <section className="formSelect">
            <label className="depart">
              부서{"  "}
              <select name="Department" ref={register}>
                <option value="부서1">부서1</option>
                <option value="부서2">부서2</option>
                <option value="부서3">부서3</option>
                <option value="부서4">부서4</option>
              </select>
            </label>
            <label className="rank">
              직급{"  "}
              <select name="rank" ref={register}>
                <option value="직급1">직급1</option>
                <option value="직급2">직급2</option>
                <option value="직급3">직급3</option>
                <option value="직급4">직급4</option>
              </select>
            </label>
          </section>
          <footer>
            <button type="submit" className="btn btn-outline-primary">
              Sign Up
            </button>
            <Link to="/">
              <button className="cancelbtn btn btn-outline-warning">
                Cancel
              </button>
            </Link>
          </footer>
        </form>
      </main>
    </Styles>
  );
};

export default SignUp;

const Styles = styled.div`
  margin: 0;
  margin-top: 100px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & header {
    margin: 0;
    padding: 5px;
    padding-left: 5px;
    width: 400px;
    text-transform: uppercase;
    letter-spacing: 3px;
    & h4 {
      margin: 0;
      padding: 0;
      padding-left: 5px;
      width: 150px;
      text-align: center;
      text-shadow: 2px 3px 3px rgba(255, 255, 255, 2),
        3px 4px 4px rgba(45, 52, 54, 1.5);
      border-bottom: 1px solid rgba(99, 110, 114, 3);
    }
  }
  & main {
    padding: 10px;
  }
  & form {
    margin: 0;
    padding: 15px;
    width: 400px;
    height: 450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background: #ecf0f1;
    border-radius: 10px;
    box-shadow: 3px 6px 6px rgba(189, 195, 199, 1);
    & label {
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & input {
        border: none;
        border-bottom: 1px solid rgba(44, 62, 80, 0.35);
        background: none;
        :focus {
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          border-bottom: 2px solid rgba(142, 68, 173, 0.53);
          background: rgba(129, 236, 236, 0.35);
          transition: 0.5s;
        }
      }
    }
    & button {
      margin: 10px 0;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 2px;
    }
    & section,
    footer {
      margin: 5px;
      padding: 10px;
      width: 360px;
      display: flex;
      flex-direction: column;
    }
    & select {
      margin-left: 5px;
    }
    & .cancelbtn {
      width: 340px;
    }
    & .formSelect {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    & .depart,
    .rank {
      margin: 0;
      padding: 0;
    }
  }
`;
