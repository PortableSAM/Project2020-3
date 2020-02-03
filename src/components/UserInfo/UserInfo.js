import React from "react";
import styled from "styled-components";
import { fireAuth } from "../AuthControl/Auth";
import firebase from "../Config/Config";
import { Link } from "react-router-dom";

const db = firebase.firestore();
const dbRef = db.collection("User");

export const UserInfo = ({ history }) => {
  const [uid, setUid] = React.useState(null);
  const [signDt, setSignDt] = React.useState(null);
  const [info, setInfo] = React.useState([]);
  const [userDep, setUserDep] = React.useState(info.UserDep);
  const [userRank, setUserRank] = React.useState(info.UserRank);
  React.useEffect(() => {
    const user = fireAuth.currentUser;
    if (user != null) {
      setUid(user.uid);
      setSignDt(user.metadata.creationTime);
      dbRef
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const userInfo = {
              ...doc.data()
            };
            setInfo(userInfo);
          }
        });
    }
  }, []);
  const userUpdat = e => {
    e.preventDefault();
    const user = fireAuth.currentUser;
    if (user != null) {
      try {
        dbRef.doc(uid).update({
          UserDep: userDep,
          UserRank: userRank,
          updateAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        history.push("/");
      } catch (error) {
        console.error("No Update", error);
        alert("No Update");
      }
    }
  };
  const userDel = () => {
    const user = fireAuth.currentUser;
    if (user != null) {
      user.delete();
      dbRef.doc(uid).delete();
    }
  };

  return (
    <Styles>
      <header>
        <h5>User Info</h5>
      </header>
      <main>
        <section>
          <label>
            Name : <input defaultValue={info.User_Name} readOnly />
          </label>
          <label>
            E-mail : <input defaultValue={info.UserEmail} readOnly />
          </label>
          <label>
            Department :{" "}
            <input
              defaultValue={info.UserDep}
              onChange={e => setUserDep(e.target.value)}
            />
          </label>
          <label>
            Rank :{" "}
            <input
              defaultValue={info.UserRank}
              onChange={e => setUserRank(e.target.value)}
            />
          </label>
          <label>
            SignUpAt:<span>{new Date(signDt).toLocaleString("ko")}</span>
          </label>
        </section>
        <footer>
          <button onClick={userDel} className="btn btn-outline-danger">
            회원탈퇴
          </button>
          <Link to="/">
            <button className="btn btn-outline-info">List</button>
          </Link>
          <button onClick={userUpdat} className="btn btn-outline-secondary">
            정보수정
          </button>
        </footer>
      </main>
    </Styles>
  );
};

const Styles = styled.div`
  margin: 0;
  margin-top: 50px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & header {
    margin: 0;
    padding: 0;
    width: 400px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    & h5 {
      margin: 0;
      height: 30px;
      border-bottom: 1px dotted gray;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
  & main {
    padding: 15px;
    width: 400px;
    height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 5px;
    background: #81ecec;
    box-shadow: 3px 6px 6px rgba(0, 184, 148, 1);
  }
  & section {
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    & label {
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & input {
        border: none;
        text-align: center;
        background: none;
        :focus {
          outline: none;
          border-bottom: 1px solid black;
        }
      }
    }
  }
  & footer {
    display: flex;
    justify-content: space-between;
    & button {
      width: 100px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
`;
