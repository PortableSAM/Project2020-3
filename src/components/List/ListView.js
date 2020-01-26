import React, { useEffect, useState } from "react";
import firebase from "../Config/Config";
import { InfoUpdate } from "./InfoUpdate";

//수신 Collection 지정
const db = firebase.firestore();
const dbRef = db.collection("Item");

//List View randering Function
function ListView() {
  const [itemInfo, setItemInfo] = useState([]);

  //Collection Item문서 수신
  useEffect(() => {
    const fetchData = () => {
      //기본정렬 방식 설정
      dbRef.orderBy("createAt", "desc").onSnapshot(snapshot => {
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
    <>
      {itemInfo.map(item => (
        <InfoUpdate key={item.id} item={item} />
      ))}
    </>
  );
}

export default ListView;
