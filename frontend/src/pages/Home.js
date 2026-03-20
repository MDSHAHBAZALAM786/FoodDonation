import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-hero">
      <nav className="home-nav">
        <div className="home-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Food Value Platform"
          />
          <span>Food Value Platform</span>
        </div>

        <div className="home-nav-links">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link primary">
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="home-content">
        <section className="home-text">
          <h1>Reduce Food Waste, Feed More People.</h1>
          <p>
            A smart shelf-life and food sharing platform that connects donors,
            receivers, and admins to make sure good food never goes to waste.
          </p>

          <div className="home-cta">
            <Link to="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline">
              I already have an account
            </Link>
          </div>

          <div className="home-stats">
            <div>
              <h3>Smart Matching</h3>
              <p>Match surplus food with nearby receivers in real time.</p>
            </div>
            <div>
              <h3>Shelf-Life Tracking</h3>
              <p>Monitor expiry and prioritize items that need attention.</p>
            </div>
            <div>
              <h3>Impact Insights</h3>
              <p>See how much food you’ve saved from landfills.</p>
            </div>
          </div>
        </section>

        <section className="home-card">
          <h2>Who are you?</h2>
          <p>Select your role to continue:</p>

          <div className="role-grid">
            <div className="role-card">
              <h3>Admin</h3>
              <p>Monitor operations, users, and food flows across the platform.</p>
            </div>
            <div className="role-card">
              <h3>Donor</h3>
              <p>Donate surplus food and track its journey to receivers.</p>
            </div>
            <div className="role-card">
              <h3>Receiver</h3>
              <p>Discover available food items and request what you need.</p>
            </div>
          </div>

          <div className="home-card-actions">
            <Link to="/signup" className="btn btn-primary full">
              Create an account
            </Link>
            <span className="hint">
              Already registered? <Link to="/login">Login here</Link>
            </span>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <span>© {new Date().getFullYear()} Food Value Platform</span>
        <span>Smart Shelf-Life & Food Sharing</span>
      </footer>
    </div>
  );
}

export default Home;