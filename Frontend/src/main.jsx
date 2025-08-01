import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import {
  UserSignup,
  OwnerSignup,
  UserLogIn,
  OwnerLogIn,
  OwnerAddSweet,
  OwnerUpdateSweet,
  OwnerAddStock,
  UserBuySweet,
  Home,
} from "./components/index.js";

const root = createRoot(document.getElementById("root"));

// defining routes
root.render(
  <BrowserRouter>
    <Routes>
      {/* Standalone Auth Routes */}
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/login" element={<UserLogIn />} />
      <Route path="/owner/signup" element={<OwnerSignup />} />
      <Route path="/owner/login" element={<OwnerLogIn />} />

      {/* App Layout */}
      <Route path="/" element={<App />}>
        <Route path="/owner/add_sweet" element={<OwnerAddSweet />} />
        <Route
          path="/owner/update_sweet/:sweetId"
          element={<OwnerUpdateSweet />}
        />
        <Route path="/owner/add_stock" element={<OwnerAddStock />} />
        <Route path="/user/buy_sweet/:sweetId" element={<UserBuySweet />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
