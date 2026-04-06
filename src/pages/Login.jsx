import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        const result = await dispatch(login({ email, password }));

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="login-container">
            <h2>LOGIN</h2>

            {/* Email */}
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password + 👁️ */}
            <div className="password-wrapper">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </span>
            </div>

            {/* Forgot password */}
            <p
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
            >
                Forgot password?
            </p>

            {/* Buttons */}
            <button className="btn-yellow" onClick={handleLogin}>
                SIGN IN
            </button>

            <button className="btn-gray" onClick={() => navigate("/")}>
                CANCEL
            </button>
        </div>
    );
}