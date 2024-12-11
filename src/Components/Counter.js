// src/components/Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, set } from "../redux/actions";

const Counter = () => {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(set(5))}>set</button>
    </div>
  );
};

export default Counter;
