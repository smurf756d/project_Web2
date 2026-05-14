import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    login,
    getProfile
} from "../../services/authService";
import SocialButtons from "./SocialButtons";

export default function LoginForm({ setActiveTab }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            setLoading(true);

            const res = await login(form);

            console.log("LOGIN RESPONSE:", res);

            localStorage.setItem("token", res.token);

            // Fetch full user profile to ensure all data is available
            try {
                const profileRes = await getProfile(res.token);
                localStorage.setItem("user", JSON.stringify(profileRes.user));
            } catch (profileError) {
                // Fallback to response user data if profile fetch fails
                localStorage.setItem("user", JSON.stringify(res.user));
            }

            setErrors({});

            alert("Login successful");
            navigate("/home");
        } catch (error) {
            console.log(error);

            setErrors({
                api:
                    error.response?.data?.message ||
                    "Login failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-panel">
            <h2>Welcome back</h2>
            <p className="auth-subtitle">Login to continue your cooking journey.</p>

            {errors.api && <div className="api-error">{errors.api}</div>}

            <form onSubmit={handleSubmit}>
                <div className="auth-field">
                    <label>Email</label>
                    <div className={`input-wrap ${errors.email ? "input-error" : ""}`}>
                        <span>✉️</span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <small className="error-text">{errors.email}</small>}
                </div>

                <div className="auth-field">
                    <label>Password</label>
                    <div className={`input-wrap ${errors.password ? "input-error" : ""}`}>
                        <span>🔒</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9-4-10-7a11.77 11.77 0 0 1 5.06-5.94M1 1l22 22" />
                                </svg>
                            ) : (

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <small className="error-text">{errors.password}</small>
                    )}
                </div>

                <div className="auth-row">
                    <label>
                        <input type="checkbox" defaultChecked /> Remember me
                    </label>
                    <button
                        type="button"
                        onClick={() =>
                            alert("Password reset feature will be available soon.")
                        }
                    >
                        Forgot password?
                    </button>
                </div>

                <button className="main-btn login-btn" disabled={loading}>
                    {loading ? <span className="spinner"></span> : "Login"}
                </button>
            </form>



    <div className="social-area">
        <SocialButtons />
    </div>

        </div>
    );
}