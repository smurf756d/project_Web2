export default function SocialButtons() {
    return (
        <>
            <div className="divider">
                <span>or continue with</span>
            </div>

            <div className="social-grid">
                <button type="button" className="social-btn">
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                    />
                    <span>Google</span>
                </button>

                <button type="button" className="social-btn">
                    <img
                        src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                        alt="Facebook"
                    />
                    <span>Facebook</span>
                </button>
            </div>
        </>
    );
}