import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

import { GlobalProvider } from "./context/GlobalState";
import App from "./App";

ReactDOM.render(
  <GlobalProvider>
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </GlobalProvider>,
  document.getElementById("root")
);
