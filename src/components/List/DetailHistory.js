import React from "react";
import styled from "styled-components";

export const DetailHistory = props => {
  const DocData = props.location.state.docId;
  console.log(DocData);
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
        <table className="table table">
          <tr>
            <th>Date</th>
            <th>user</th>
            <th>Quantity</th>
            <th>Log history</th>
          </tr>
        </table>
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
    width: 500px;
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
  & th {
    text-align: center;
  }
`;
