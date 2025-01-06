import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SearchQueryProvider } from "./context/SearchQueryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SearchQueryProvider>
      <App />
    </SearchQueryProvider>
  </StrictMode>
);
