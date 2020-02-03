import React, { useEffect } from "react";
import ListView from "./ListView";
import { Modal } from "reactstrap";
import { Link } from "react-router-dom";
import { ItemInput } from "../Item/ItemCreate";
import styled from "styled-components";
import { fireAuth } from "../AuthControl/Auth";

export function ListApp() {
  const [modal, setModal] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [lastST, setLastST] = React.useState(null);
  const onToggle = () => setModal(!modal === true);
  useEffect(() => {
    const user = fireAuth.currentUser;
    if (user != null) {
      const email = user.email;
      const lastST = user.metadata.lastSignInTime;
      setEmail(email);
      setLastST(lastST);
    }
  }, []);
  const signOut = () => {
    fireAuth.signOut();
  };

  return (
    <ListContainer>
      <ListTitle>
        <h2>Project 2020-3</h2>
        <span>
          <Link to="/userinfo">
            <p>{`${email}`}</p>
          </Link>
          <p> {`${new Date(lastST).toLocaleString("ko")}`}</p>
        </span>
        <button
          type="submit"
          className="btn btn-outline-primary"
          onClick={signOut}
        >
          Sign Out
        </button>
      </ListTitle>
      <ListTable>
        <table className="table table">
          <thead>
            <tr>
              <th>분류</th>
              <th>CreateTime</th>
              <th>구입일</th>
              <th>제품명</th>
              <th>Lot No.</th>
              <th>수량</th>
              <th>가격</th>
              <th>등록자</th>
              <th>비고</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <ListView />
        </table>
      </ListTable>
      <TableBtn>
        <button className="btn btn-outline-secondary" onClick={onToggle}>
          항목추가
        </button>
        <Modal name="modal" isOpen={modal} toggle={onToggle}>
          <ItemInput />
        </Modal>
      </TableBtn>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListTitle = styled.div`
  width: 90%;
  padding-left: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  & h2 {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 2px 3px 3px rgba(255, 255, 255, 1),
      3px 4px 4px rgba(45, 52, 54, 1.5);
  }
  & button {
    margin-left: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
  }
  & span {
    width: 75%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    & a {
      text-decoration: none;
    }
    & p {
      margin: 0;
      margin-left: 20px;
      font-size: 1rem;
      font-weight: bold;
      color: rgba(108, 92, 231, 1);
      :hover {
        color: rgba(108, 92, 230, 0.8);
        transition: 0.7s;
      }
    }
  }
`;
const ListTable = styled.div`
  padding: 10px;
  width: 90%;
  height: 700px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  border-radius: 5px;
  overflow-y: scroll;
  & td,
  th {
    vertical-align: middle;
    text-align: center;
  }
`;
const TableBtn = styled.div`
  margin-top: 20px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  letter-spacing: 4px;
`;
