import React from "react";
import { useForm } from "react-hook-form";
import firebase from "./Config/Config";
import "./Style/ItemCreate.css";

//fireStore collection 지정(doc.id는 자동생성).
const db = firebase.firestore();
const dbRef = db.collection("Item").doc();
const createAt = firebase.firestore.Timestamp.fromDate(new Date());

export const ItemInput = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    const newItem = { data, createAt: createAt };
    try {
      dbRef.set(newItem);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  return (
    <div className="input_container">
      <div className="input_title">
        <h4>물품등록</h4>
      </div>
      <form className="input_form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          작성자
          <input
            type="text"
            name="registor"
            ref={register({ required: true })}
          />
          {errors.registor && `작성자 입력요망`}
        </label>
        <div className="item_name">
          <label>
            제품이름
            <input
              type="text"
              name="itemNm"
              ref={register({ required: true })}
            />
            {errors.itemNm && `제품이름 입력요망`}
          </label>
          <label>
            분류
            <select type="text" name="type" ref={register}>
              <option value="Mask">Mask</option>
              <option value="Tool">Tool</option>
              <option value="Gloves">Gloves</option>
              <option value="Office">Office</option>
              <option value="Computer goods">Computer goods</option>
              <option value="etc">etc.</option>
            </select>
          </label>
        </div>
        <label>
          로트번호
          <input type="text" name="lot" ref={register} />
        </label>
        <div className="item_quanti">
          <label>
            수량
            <input
              type="number"
              name="quantity"
              min="0"
              ref={register({ required: true })}
            />
            {errors.quantity && `수량 입력요망`}
          </label>
          <label>
            단위
            <select type="text" name="unit" ref={register}>
              <option value="EA">EA</option>
              <option value="SET">SET</option>
              <option value="PK">PK</option>
            </select>
          </label>
        </div>
        <label>
          구매가격
          <input type="text" name="price" ref={register} />
        </label>
        <label>
          구입일자
          <input type="date" name="date" ref={register({ required: true })} />
          {errors.date && `구입일자 입력요망`}
        </label>
        <textarea
          name="etc"
          placeholder="기타 특이사항 및 상세사항 기입."
          ref={register}
        />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
};
