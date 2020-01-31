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
      dbRef.doc(uid).update({
        UserDep: userDep,
        UserRank: userRank,
        updateAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      history.push("/");
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
  margin-top: 100px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & label {
      width: 300px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      & input {
        border: none;
        text-align: center;
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
  }
`;
