import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { AllRequestsProvider } from "./context/AllRequestsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AllRequestsProvider>
      <App />
    </AllRequestsProvider>
  </StrictMode>
);
