import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { withExtraArgument } from "redux-thunk";
import { rootReducer } from "./root-reducer";
import axios from "axios";
import * as api from "../config";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(withExtraArgument({
    client : axios, 
    api,
  })))
);
