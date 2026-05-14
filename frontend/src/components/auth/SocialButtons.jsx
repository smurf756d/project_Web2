export default function SocialButtons() {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:5000/api/v1/auth/google";
    };

    return (
        <div style={{ width: "100%", marginTop: "18px" }}>
            <button
                type="button"
                className="social-btn"
                onClick={handleGoogleLogin}
                style={{
                    width: "100%",
                    minHeight: "54px",
                    borderRadius: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px"
                }}
            >
                <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                />
                Continue with Google
            </button>
        </div>
    );
}