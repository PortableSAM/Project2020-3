import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Input } from "reactstrap";
import firebase from "./Config/Config";
import "./Style/ItemCreate.css";

const db = firebase.firestore();
const dbRef = db.collection("Item").doc();

export const ItemInput = () => {
  const [type, setType] = useState();
  const [date, setDate] = useState();
  const [itemNm, setItemNm] = useState();
  const [lot, setLot] = useState();
  const [quantity, setQuantity] = useState();
  const [unit, setUnit] = useState();
  const [price, setPrice] = useState();
  const [registor, setregistor] = useState();
  const [etc, setEtc] = useState();

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
  console.log();
  const handleInput = e => {
    e.preventDefault();
    try {
      dbRef.set(newItem);
      alert("등 록 완 료");
    } catch (error) {
      console.error("Submit Failed", error);
      alert("Submit Failed");
    }
  };

  return (
    <div className="input-container">
      <form name="item-info">
        <div className="item-container">
          <div className="input-title">
            <h3>품목등록</h3>
          </div>
          <div className="item-sepc-container">
            <div className="item-registrante">
              <label>
                등 록 자 :
                <input
                  type="text"
                  placeholder="등 록 자"
                  defaultValue={setregistor}
                  onChange={e => setregistor(e.target.value)}
                />{" "}
              </label>
            </div>
            <div className="item-name">
              <label>
                제품분류
                <Col lg={"auto"}>
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
              </label>
              <label>
                제품이름 :
                <input
                  type="text"
                  placeholder="제품이름"
                  defaultValue={setItemNm}
                  onChange={e => setItemNm(e.target.value)}
                />
              </label>
            </div>
            <div className="item-LotNumber">
              <label>
                로트넘버 :
                <input
                  type="text/number"
                  placeholder="Lot Number"
                  defaultValue={setLot}
                  onChange={e => setLot(e.target.value)}
                />
              </label>
            </div>
            <div className="item-Quantity">
              <label>
                구매수량 :
                <input
                  type="number"
                  name="quantity"
                  min="0"
                  placeholder="0"
                  defaultValue={setQuantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </label>
              <label>
                수량단위
                <Col lg={"auto"}>
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
              </label>
            </div>
            <div className="item-PurchasePrice">
              <label>
                구매단가 :
                <input
                  type="text"
                  name="price"
                  placeholder="구매단가"
                  defaultValue={setPrice}
                  onChange={e => setPrice(e.target.value)}
                />
              </label>
            </div>
            <div className="item-DateOfPurchase">
              <label>
                구매일자 :
                <input
                  type="date"
                  name="date"
                  defaultValue={setDate}
                  onChange={e => setDate(e.target.value)}
                />{" "}
              </label>
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
        <div className="input-btn">
          <button className="btn btn-warning" onClick={handleInput}>
            <Link to="/">Submit</Link>
          </button>
        </div>
      </form>
    </div>
  );
};
