import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import firebase from "../Config/Config";
import { HistoryView } from "./HistoyView";
import { Link } from "react-router-dom";

export const DetailHistory = props => {
  const DocData = props.location.state.docId;

  const db = firebase.firestore();
  const dbRef = db
    .collection("Item")
    .doc(DocData.id)
    .collection(DocData.itemNm)
    .doc();

  const { register, handleSubmit, errors } = useForm();

  const onLogSubmit = data => {
    dbRef.set({
      date: data.hisdate,
      user: data.user,
      quantity: data.quantity,
      loghistory: data.loghis,
      createAt: firebase.firestore.Timestamp.fromDate(new Date())
    });
  };

  return (
    <Styles>
      <header>
        <h5>Detail History</h5>
      </header>
      <main>
        <section>
          <label className="history_regist">
            <p>
              등록일자:{" "}
              {new Date(DocData.createAt.seconds * 1000).toLocaleString("ko")}
            </p>
            <p>작 성 자: {DocData.registor}</p>
          </label>
          <label className="history_item">
            <p>
              제품명: {DocData.itemNm}({DocData.type})
            </p>
            <p>로트번호: {DocData.lot}</p>
          </label>
          <label>
            등록수량: {DocData.quantity} {DocData.unit}
          </label>
          <label className="history_buy">
            <p>구입가격: {DocData.price}</p>
            <p>구입일자: {DocData.date}</p>
          </label>
        </section>
        <form onSubmit={handleSubmit(onLogSubmit)}>
          <table className="table table">
            <thead>
              <tr>
                <th>Date</th>
                <th>user</th>
                <th>Quantity</th>
                <th>Log history</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <input
                    type="date"
                    name="hisdate"
                    ref={register({ require: true })}
                  />
                  {errors.hisdate && "날짜 작성 바랍니다."}
                </th>
                <td>
                  <input name="user" ref={register({ require: true })} />
                  {errors.user && "사용자 작성 바랍니다."}
                </td>
                <td>
                  <input
                    type="number"
                    name="quantity"
                    ref={register({ require: true })}
                  />
                  {errors.quantity && "수량 작성 바랍니다."}
                </td>
                <td>
                  <input
                    type="textarea"
                    name="loghis"
                    ref={register({ require: true })}
                  />
                  {errors.loghis && "이력 작성 바랍니다."}
                </td>
                <td>
                  <button type="submit">Registration</button>
                </td>
              </tr>
            </tbody>
            <HistoryView docData={DocData} />
          </table>
        </form>
        <footer>
          <Link to="/">
            <button className="btn btn-outline-secondary">List</button>
          </Link>
        </footer>
      </main>
    </Styles>
  );
};

const Styles = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & section {
    width: 865px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & .history_regist,
    .history_buy,
    .history_item {
      display: flex;
      justify-content: space-between;
      & p {
        margin: 0;
      }
    }
  }
  & main {
    margin: 0;
    padding: 10px;
    border: 1px solid black;
    & footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      & button {
        text-transform: uppercase;
        letter-spacing: 2px;
      }
    }
  }
  & th {
    text-align: center;
  }
  & form {
    height: 600px;
    overflow-y: scroll;
  }
  & tbody {
    & input {
      border: none;
      border-bottom: 1px solid gray;
      text-align: center;
      :focus {
        background: #f7d794;
        border-bottom: 2px solid darkgray;
      }
    }
    & th,
    td {
      padding: 5px;
    }
  }
`;
