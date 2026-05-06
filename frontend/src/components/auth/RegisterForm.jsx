import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { register } from "../../services/authService";
import SocialButtons from "./SocialButtons";

export default function RegisterForm({ setActiveTab }) {
    const editorRef = useRef(null);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [finalPreview, setFinalPreview] = useState(null);
    const [scale, setScale] = useState(1.2);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "", api: "" });
    };

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setErrors({ ...errors, image: "Please upload a valid image file" });
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setErrors({ ...errors, image: "Image size must be less than 2MB" });
            return;
        }

        setErrors({ ...errors, image: "" });
        setImage(file);
        setFinalPreview(null);
    };

    const saveCroppedImage = () => {
        if (!editorRef.current) return;

        const canvas = editorRef.current.getImageScaledToCanvas();
        const croppedImage = canvas.toDataURL("image/png");

        setFinalPreview(croppedImage);
    };

    const removeImage = () => {
        setImage(null);
        setFinalPreview(null);
        setScale(1.2);
    };

    const validate = () => {
        const newErrors = {};

        if (!form.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const passwordStrength =
        form.password.length >= 8
            ? "Strong"
            : form.password.length >= 4
                ? "Medium"
                : "Weak";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);

            await register({
                ...form,
                profileImage: finalPreview || null,
            });

            alert("Registered successfully");
            setActiveTab("login");
        } catch (error) {
            setErrors({
                api:
                    error.response?.data?.message || "Register failed. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-panel">
            <h2>Create account</h2>
            <p className="auth-subtitle">Join Smart Kitchen Hub today.</p>

            {errors.api && <div className="api-error">{errors.api}</div>}

            <form onSubmit={handleSubmit}>
                <div className="avatar-section">
                    {!image && !finalPreview && (
                        <>
                            <label htmlFor="profileImage" className="avatar-placeholder">
                                <div className="default-avatar">
                                    {form.fullName ? form.fullName[0].toUpperCase() : "U"}
                                </div>
                            </label>

                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                            />

                            <small>Upload profile photo optional</small>
                        </>
                    )}

                    {image && !finalPreview && (
                        <div className="avatar-editor-box">
                            <AvatarEditor
                                ref={editorRef}
                                image={image}
                                width={120}
                                height={120}
                                border={18}
                                borderRadius={80}
                                color={[255, 255, 255, 0.75]}
                                scale={scale}
                                rotate={0}
                            />

                            <div className="zoom-control">
                                <span>Zoom</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="2.5"
                                    step="0.1"
                                    value={scale}
                                    onChange={(e) => setScale(Number(e.target.value))}
                                />
                            </div>

                            <div className="avatar-actions">
                                <button type="button" onClick={saveCroppedImage}>
                                    Save photo
                                </button>
                                <button type="button" onClick={removeImage}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}

                    {finalPreview && (
                        <div className="final-avatar-box">
                            <img src={finalPreview} alt="Final profile" />
                            <div className="avatar-actions">
                                <label htmlFor="profileImage" className="change-photo-btn">
                                    Change photo
                                </label>
                                <button type="button" onClick={removeImage}>
                                    Remove
                                </button>
                            </div>

                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </div>
                    )}

                    {errors.image && <small className="error-text">{errors.image}</small>}
                </div>

                <div className="auth-field">
                    <label>Full Name</label>
                    <div className={`input-wrap ${errors.fullName ? "input-error" : ""}`}>
                        <span>👤</span>
                        <input
                            name="fullName"
                            placeholder="Enter your full name"
                            value={form.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.fullName && (
                        <small className="error-text">{errors.fullName}</small>
                    )}
                </div>

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

                <div className="row g-2">
                    <div className="col-12 col-md-6">
                        <div className="auth-field">
                            <label>Password</label>
                            <div
                                className={`input-wrap ${errors.password ? "input-error" : ""}`}
                            >
                                <span>🔒</span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.password && (
                                <small className="error-text">{errors.password}</small>
                            )}
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="auth-field">
                            <label>Confirm</label>
                            <div
                                className={`input-wrap ${
                                    errors.confirmPassword ? "input-error" : ""
                                }`}
                            >
                                <span>🔒</span>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <small className="error-text">
                                    {errors.confirmPassword}
                                </small>
                            )}
                        </div>
                    </div>
                </div>

                {form.password && (
                    <div className={`strength ${passwordStrength.toLowerCase()}`}>
                        Password strength: {passwordStrength}
                    </div>
                )}

                <label className="terms">
                    <input type="checkbox" required /> I agree to the Terms & Privacy
                    Policy
                </label>

                <button className="main-btn register-btn" disabled={loading}>
                    {loading ? <span className="spinner"></span> : "Create Account →"}
                </button>
            </form>

            <SocialButtons />

            <p className="switch-text">
                Already have an account?{" "}
                <button onClick={() => setActiveTab("login")}>Login</button>
            </p>
        </div>
    );
}