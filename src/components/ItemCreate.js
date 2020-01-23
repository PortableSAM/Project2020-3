import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Input } from "reactstrap";
import firebase from "./Config/Config";
import "./Style/ItemCreate.css";

const db = firebase.firestore();
const dbRef = db.collection("Item").doc();

export const ItemInput = () => {
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [itemNm, setItemNm] = useState(null);
  const [lot, setLot] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState(null);
  const [price, setPrice] = useState(null);
  const [registor, setregistor] = useState(null);
  const [etc, setEtc] = useState(null);

  const newItem = {
    type: type,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    date: date,
    itemNm: itemNm,
    lot: lot,
    quantity: quantity,
    unit: unit,
    price: price,
    registor: registor,
    etc: etc
  };
  console.log(newItem);
  const handleInput = e => {
    e.preventDefault();
    if (!newItem === null) {
      alert("자료입력 요망");
    } else {
      dbRef.set(newItem);
      alert("등 록 완 료");
    }
  };

  return (
    <form name="item-info">
      <div className="item-container">
        <div className="input-title">
          <h3>품목등록</h3>
        </div>
        <div className="item-sepc-container">
          <div className="item-registrante">
            <label name="ItemRegistrant">등록자 : </label>
            <input
              type="text"
              placeholder="등록자"
              defaultValue={setregistor}
              onChange={e => setregistor(e.target.value)}
            />
          </div>
          <div className="item-name">
            <label name="ItemName">제품이름 : </label>
            <input
              type="text"
              placeholder="제품이름"
              defaultValue={setItemNm}
              onChange={e => setItemNm(e.target.value)}
            />
            <label name="item-type">제품분류 :</label>
            <Col lg={4}>
              <Input
                type="select"
                name="type"
                defaultValue={setType}
                onChange={e => setType(e.target.value)}
              >
                <option>Mask</option>
                <option>Tool</option>
                <option>Office</option>
                <option>장갑</option>
              </Input>
            </Col>
          </div>
          <div className="item-LotNumber">
            <label name="ItemLotNumber">로트넘버 : </label>
            <input
              type="text/number"
              placeholder="Lot Number"
              defaultValue={setLot}
              onChange={e => setLot(e.target.value)}
            />
          </div>
          <div className="item-Quantity">
            <label name="ItemQuantity">구매수량 : </label>
            <input
              type="number"
              name="quantity"
              min="0"
              placeholder="0"
              defaultValue={setQuantity}
              onChange={e => setQuantity(e.target.value)}
            />
            <Col lg={4}>
              <Input
                type="select"
                name="unti"
                placeholder="수량 단위"
                defaultValue={setUnit}
                onChange={e => setUnit(e.target.value)}
              >
                <option>set</option>
                <option>EA</option>
                <option>PK</option>
              </Input>
            </Col>
          </div>
          <div className="item-PurchasePrice">
            <label name="ItemPurchasePrice">구매단가 : </label>
            <input
              type="text"
              name="price"
              placeholder="구매단가"
              defaultValue={setPrice}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className="item-DateOfPurchase">
            <label name="ItemDateOfPurchase">구매일자 : </label>
            <input
              type="date"
              name="date"
              defaultValue={setDate}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="item-Etc">
          <textarea
            type="input"
            name="item-etc"
            placeholder="품목의 기타 상세정보 기입"
            defaultValue={setEtc}
            onChange={e => setEtc(e.target.value)}
          />
        </div>
      </div>
      <button
        className="inputbtn btn btn-outline-secondary"
        onClick={handleInput}
      >
        <Link to="/">등 록</Link>
      </button>
    </form>
  );
};
