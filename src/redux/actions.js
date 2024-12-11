// src/redux/actions.js
export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
export const set = (value) => ({ type: "SET" ,payload: value});
