import { createStore, combineReducers } from "redux";
import counterReducer from "./reducer";
import user_data from "./user_data";
import Client_data from "./client_data";


const rootReducer = combineReducers({
  counter: counterReducer, 
  user: user_data,    
  client:Client_data     
});


const store = createStore(rootReducer);

export default store;
