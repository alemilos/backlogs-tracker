import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Pages
import Home from "pages/Home";
import Login from "pages/Login";
import Register from "pages/Register";
import AuthProvider from "providers/AuthProvider";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" theme="colored" />
    </AuthProvider>
  );
}

export default App;
