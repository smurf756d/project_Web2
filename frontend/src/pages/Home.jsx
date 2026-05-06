import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
  const features = [
    {
      icon: "🥘",
      title: "Create Smart Recipes",
      text: "Start from what you already have and discover recipe ideas easily.",
    },
    {
      icon: "🥗",
      title: "Healthy Suggestions",
      text: "Find diet-friendly ideas that match your lifestyle and preferences.",
    },
    {
      icon: "📌",
      title: "Save Your Favorites",
      text: "Keep your favorite meals organized and easy to access anytime.",
    },
  ];

  return (
    <main className="home-page">
      <nav className="home-navbar container">
        <div className="home-logo">
          <span className="logo-icon">🍃</span>
          <span>Smart Kitchen Hub</span>
        </div>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-success home-nav-btn"
            onClick={() => alert("This will go to Login page later.")}
          >
            Login
          </button>

          <button
            type="button"
            className="btn btn-success home-nav-btn"
            onClick={() => alert("This will go to Register page later.")}
          >
            Register
          </button>
        </div>
      </nav>

      <section className="container home-hero">
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <div className="hero-content">
              <p className="home-label">AI Powered Cooking Assistant</p>

              <h1 className="home-title">
                Turn your ingredients into smart recipe ideas.
              </h1>

              <p className="home-description">
                Smart Kitchen Hub helps users discover recipe ideas, reduce food
                waste, explore healthy suggestions, and manage saved recipes in
                one clean dashboard.
              </p>

              <div className="d-flex flex-wrap gap-3">
               <button
  type="button"
  className="btn btn-success home-main-btn"
  onClick={() => navigate("/dashboard")}
>
  Get Started →
</button>
                <button
                  type="button"
                  className="btn btn-light border home-secondary-btn"
                  onClick={() => {
                    document
                      .getElementById("features-section")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn More
                </button>
              </div>

              <div className="home-mini-stats">
                <div>
                  <strong>AI</strong>
                  <span>Recipe ideas</span>
                </div>
                <div>
                  <strong>Easy</strong>
                  <span>Cooking flow</span>
                </div>
                <div>
                  <strong>Healthy</strong>
                  <span>Suggestions</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="hero-image-wrapper">
              <div className="floating-card floating-card-top">
                🥗 Healthy picks
              </div>

              <img
                src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=900"
                alt="Smart kitchen food"
                className="home-hero-image"
              />

              <div className="floating-card floating-card-bottom">
                🍳 Recipe ready
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features-section"
        className="container home-features"
      >
        <div className="text-center mb-4">
          <p className="home-label mb-2">Why Choose Us</p>
          <h2 className="home-section-title">A smarter way to cook</h2>
          <p className="text-muted mb-0">
            Simple tools designed to make daily cooking easier and more personal.
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-12 col-md-4" key={feature.title}>
              <div className="home-feature-card h-100">
                <div className="feature-icon">{feature.icon}</div>
                <h5>{feature.title}</h5>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;