import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch                  = useDispatch();
    const [email, setEmail]         = useState("");
    const [password, setPassword]   = useState("");

    const navigate                  = useNavigate();

    const handleLogin = async () => {
        const result = await dispatch(login({ email, password }));

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        }
    };

    return (
        <div className="login-container">
        <h2>LOGIN</h2>
        <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-yellow" onClick={handleLogin}>
            SIGN IN
        </button>

        <button className="btn-gray">
            CANCEL
        </button>
        </div>
    );
}