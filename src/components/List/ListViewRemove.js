import React from "react";
import firebase from "../Config/Config";

const db = firebase.firestore();
const dbRef = db.collection("Item");
export const LVRemove = ({ item }) => {
  const handleRemove = () => {
    try {
      //doc.id를 props로 받아서 document 삭제.
      dbRef.doc(item.id).delete();
      alert("Data Remove");
      console.log("Data Remove");
    } catch (error) {
      console.error("Remove Failed", error);
      alert("Data Failed");
    }
  };

  return (
    <button className="btn btn-outline-danger" onClick={handleRemove}>
      삭 제
    </button>
  );
};
