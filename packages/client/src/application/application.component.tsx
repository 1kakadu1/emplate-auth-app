import React from "react";
import { Provider } from "react-redux";
import useLocalStorage from "../hook/useLocalStorage";
import { store } from "../store/state";
import "../styles/App.css";
import { IUser } from "../types";
import {
  TOKEN_KEY_LOCAL_STORE,
  USER_KEY_LOCAL_STORE,
} from "./application.model";
import { ApplicationRouter } from "./application.router";

function App() {
  const [user] = useLocalStorage<IUser | null>(USER_KEY_LOCAL_STORE, null);
  const token = localStorage.getItem(TOKEN_KEY_LOCAL_STORE) || null;
  return (
    <div className="App">
      <Provider store={store}>
        <ApplicationRouter token={token} user={user} />
      </Provider>
    </div>
  );
}

export default App;
