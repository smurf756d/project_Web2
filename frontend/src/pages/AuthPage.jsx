import { useState } from "react";
import AuthCard from "../components/auth/AuthCard";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <main className="auth-page">
            <div className="auth-bg auth-bg-one"></div>
            <div className="auth-bg auth-bg-two"></div>

            <div className="auth-shell auth-shell--centered">
                <AuthCard activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </main>
    );
}