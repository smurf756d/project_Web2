import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthCard from "../components/auth/AuthCard";

export default function AuthPage() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mode = params.get("mode");

        if (mode === "register") {
            setActiveTab("register");
        } else {
            setActiveTab("login");
        }
    }, [location.search]);

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