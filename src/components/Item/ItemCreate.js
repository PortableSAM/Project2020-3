import React from "react";
import { useForm } from "react-hook-form";
import firebase from "../Config/Config";
import styled from "styled-components";

//fireStore collection 지정(doc.id는 자동생성).
const db = firebase.firestore();
const dbRef = db.collection("Item").doc();
//fireStore Timestamp 적용.
const createAt = firebase.firestore.Timestamp.fromDate(new Date());

export const ItemInput = () => {
  //React Hook Form 사용.
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
    <InputContainer>
      <InputTitle>
        <h4>물품등록</h4>
      </InputTitle>
      <InputForm className="input_form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="registor"
          placeholder="작성자"
          ref={register({ required: true })}
        />
        {errors.registor && `작성자 입력요망`}
        <div className="item_name">
          <input
            type="text"
            name="itemNm"
            placeholder="제품이름"
            ref={register({ required: true })}
          />
          {errors.itemNm && `제품이름 입력요망`}
          <select type="text" name="type" ref={register}>
            <option value="Mask">Mask</option>
            <option value="Tool">Tool</option>
            <option value="Gloves">Gloves</option>
            <option value="Office">Office</option>
            <option value="Computer goods">Computer goods</option>
            <option value="etc">etc.</option>
          </select>
        </div>
        <input type="text" name="lot" placeholder="로트번호" ref={register} />
        <div className="item_quanti">
          <input
            type="number"
            name="quantity"
            min="0"
            placeholder="수량"
            ref={register({ required: true })}
          />
          {errors.quantity && `수량 입력요망`}
          <select type="text" name="unit" ref={register}>
            <option value="EA">EA</option>
            <option value="SET">SET</option>
            <option value="PK">PK</option>
          </select>
        </div>
        <input type="text" name="price" placeholder="구입금액" ref={register} />
        <input
          type="date"
          name="date"
          placeholder="구입일자"
          ref={register({ required: true })}
        />
        {errors.date && `구입일자 입력요망`}
        <textarea
          name="etc"
          placeholder="기타 특이사항 및 상세사항 기입."
          ref={register}
        />
        <button type="submit" className="btn btn-outline-info">
          등록하기
        </button>
      </InputForm>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputTitle = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px;
  letter-spacing: 3px;
  & h4 {
    margin: 0;
  }
`;

const InputForm = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  & input {
    margin: 5px;
    width: 150px;
    text-align: center;
    letter-spacing: 2px;
    border: none;
    border-bottom: 1px solid gray;
    background: none;
  }
  & textarea {
    margin: 5px;
  }
  & select {
    text-align: center;
  }
`;
