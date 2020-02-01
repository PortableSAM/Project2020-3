import React, { useEffect, useState } from "react";
import firebase from "../Config/Config";
import styled from "styled-components";

export const HistoryView = ({ docData }) => {
  const [his, setHis] = useState([]);
  const db = firebase.firestore();
  const dbRef = db
    .collection("Item")
    .doc(docData.id)
    .collection(docData.itemNm);

  //Collection docData.itemNm 문서 수신
  useEffect(() => {
    //기본정렬 방식 설정
    const Log = dbRef.orderBy("createAt", "desc").onSnapshot(snapshot => {
      const log = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Collection docData.itemNm doc Data를 his에 반영
      setHis(log);
    });

    return Log;
  }, [dbRef]);

  return (
    <>
      {his.map(his => (
        <HisView key={his.id}>
          <tr>
            <th scope="row">{his.date}</th>
            <td>{his.user}</td>
            <td>{his.quantity}</td>
            <td>{his.loghistory}</td>
          </tr>
        </HisView>
      ))}
    </>
  );
};

const HisView = styled.tbody`
  text-align: center;
  & th,
  td {
    padding: 5px;
  }
`;
