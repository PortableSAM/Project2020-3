import React, { useEffect, useState } from "react";
import firebase from "./Config/Config";
import { LVRemove } from "./ListViewRemove";

const db = firebase.firestore();
const dbRef = db.collection("Item");

function ListView() {
  const [itemInfo, setItemInfo] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      dbRef.onSnapshot(snapshot => {
        const info = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItemInfo(info);
      });
    };
    return fetchData();
  }, []);

  return (
    <tbody>
      {itemInfo.map((item, index) => (
        <tr key={index}>
          <th scope="row">{item.type}</th>
          <td>
            {new Date(item.createAt.seconds * 1000).toLocaleDateString("ko")}
          </td>
          <td>{item.date}</td>
          <td>{item.itemNm}</td>
          <td>{item.lot}</td>
          <td>
            {item.quantity}
            {item.unit}
          </td>
          <td>{item.price}</td>
          <td>{item.registor}</td>
          <td>{item.etc}</td>
          <td>
            <button className="btn btn-outline-warning">수 정</button>
          </td>
          <td>
            <LVRemove item={item} />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default ListView;
