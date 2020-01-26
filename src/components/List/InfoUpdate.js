import React, { useState } from "react";
import { LVRemove } from "./ListViewRemove";
import firebase from "../Config/Config";

const db = firebase.firestore();
const dbRef = db.collection("Item");

export const InfoUpdate = ({ item }) => {
  const [date, setDate] = useState(item.date);
  const [etc, setEtc] = useState(item.etc);
  const [unit, setUnit] = useState(item.unit);

  const handleUpdat = () => {
    try {
      //해당 doc.id 필드값 업데이트, 업데이트 시간 기록(서버수신 시간 기준).
      dbRef.doc(item.id).update({
        date: date,
        etc: etc,
        unit: unit,
        updateAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Edited");
    } catch (error) {
      console.error("Edited Err", error);
    }
  };

  return (
    <tbody>
      <tr key={item.id}>
        <th scope="row">{item.type}</th>
        <td>{new Date(item.createAt.seconds * 1000).toLocaleString("ko")}</td>
        <td>
          <input
            className="item-date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </td>
        <td>{item.itemNm}</td>
        <td>{item.lot}</td>
        <td>
          {item.quantity}{" "}
          <input
            className="item-unit"
            type="text"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          />
        </td>
        <td>{item.price}</td>
        <td>{item.registor}</td>
        <td>
          <input
            className="item-etc"
            type="textarea"
            value={etc}
            onChange={e => setEtc(e.target.value)}
          />
        </td>
        <td>
          <button className="btn btn-outline-warning" onClick={handleUpdat}>
            수 정
          </button>
        </td>
        <td>
          <LVRemove item={item} />
        </td>
      </tr>
    </tbody>
  );
};
