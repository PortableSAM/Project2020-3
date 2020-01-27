import React from "react";
import ListView from "./ListView";
import { Modal } from "reactstrap";
import { ItemInput } from "../ItemCreate";
import styled from "styled-components";

function ListApp() {
  const [modal, setModal] = React.useState(false);
  const onToggle = () => setModal(!modal === true);

  return (
    <ListContainer>
      <ListTitle>
        <h2>Project 2020-3</h2>
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

export default ListApp;

const ListContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ListTitle = styled.div`
  padding-left: 85px;
  align-self: flex-start;
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
