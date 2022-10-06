import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./application/application.component";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <App />
  //TODO: Вызывает useEffect 2 раза из-за чего идет нескольуо запросов. Падает БД при обновлении токенов.
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
