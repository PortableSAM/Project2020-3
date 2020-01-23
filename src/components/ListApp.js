import React from "react";
import ListView from "./ListView";
import "./Style/ListApp.css";
import { Link } from "react-router-dom";

function ListApp() {
  return (
    <div className="list-container">
      <div className="list-title">
        <h2>List Title</h2>
      </div>
      <div className="list-table">
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
      </div>
      <div className="table-btn">
        <Link to="/input">
          <button className="tablebtn btn btn-secondary">추 가</button>
        </Link>
      </div>
    </div>
  );
}

export default ListApp;
