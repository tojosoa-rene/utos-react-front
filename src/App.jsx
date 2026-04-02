import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch }from "react-redux";
import { useEffect } from "react"; //React hook
import { getMe } from "./features/auth/authSlice";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  // maka dispatch function avy amin'ny Redux
  const dispatch = useDispatch();
  //maka user avy amin'ny Redux
  const user  = useSelector((state) => state.auth.user);
  // maka token avy amin'ny Redux
  // const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(getMe()); // miverina fetch user
    }
  }, [dispatch, user]); //dependency array

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}   // auth guard
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;