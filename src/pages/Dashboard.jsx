import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
}