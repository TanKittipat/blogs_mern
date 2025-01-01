import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { CookiesProvider } from "react-cookie";
import router from "./routes/router";
import { AuthProvider } from "./contexts/auth.context";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CookiesProvider>
  </StrictMode>
);
