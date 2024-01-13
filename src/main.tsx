import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GlobalProvider } from "./context/provider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
