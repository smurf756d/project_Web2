import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthCard({ activeTab, setActiveTab }) {
    return (
        <div className="auth-card">
            <div className="auth-logo">👩🏻‍🍳 Smart Kitchen Hub</div>

            <div className="auth-tabs">
                <button
                    className={activeTab === "login" ? "active" : ""}
                    onClick={() => setActiveTab("login")}
                >
                    Login
                </button>

                <button
                    className={activeTab === "register" ? "active" : ""}
                    onClick={() => setActiveTab("register")}
                >
                    Register
                </button>
            </div>

            {activeTab === "login" ? (
                <LoginForm />
            ) : (
                <RegisterForm />
            )}
        </div>
    );
}