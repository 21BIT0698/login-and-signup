import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // ❌ Remove StrictMode to avoid double rendering
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);
