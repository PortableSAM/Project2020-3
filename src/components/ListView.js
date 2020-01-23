import React, { useEffect, useState } from "react";
import firebase from "./Config/Config";
import { LVRemove } from "./ListViewRemove";

//수신 Collection 지정
const db = firebase.firestore();
const dbRef = db.collection("Item");

//List View randering Function
function ListView() {
  const [itemInfo, setItemInfo] = useState([]);

  //Collection Item문서 수신
  useEffect(() => {
    const fetchData = () => {
      dbRef.onSnapshot(snapshot => {
        const info = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Collection Item doc Data를 itemInfo에 반영
        setItemInfo(info);
      });
    };
    return fetchData();
  }, []);

  return (
    <tbody>
      {itemInfo.map(item => (
        <tr key={item.id}>
          <th scope="row">{item.type}</th>
          <td>{new Date(item.createAt.seconds * 1000).toLocaleString("ko")}</td>
          <td>{item.date}</td>
          <td>{item.itemNm}</td>
          <td>{item.lot}</td>
          <td>
            {item.quantity} {item.unit}
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
