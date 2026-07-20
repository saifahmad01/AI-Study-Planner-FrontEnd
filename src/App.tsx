import mascotImg from './assets/mascot.png'
import './App.css'

function App() {
  return (
    <div className="app-wrapper">
      <div className="app-container">
        {/* ── Navbar ─────────────────────────────────── */}
        <nav className="navbar">
          <div className="nav-logo">
            <span className="logo-icon">💡</span>
            <span className="logo-text">AI Study</span>
          </div>
          <div className="nav-links">
            <a href="#dashboard" className="nav-link">•Dashboard•</a>
            <a href="#about" className="nav-link">•About•</a>
            <button type="button" className="btn-signup">Sign Up</button>
          </div>
        </nav>

        {/* ── Hero Section ──────────────────────────── */}
        <section className="hero">
          <div className="hero-bg-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <span className="shape shape-dot shape-dot-1">✦</span>
            <span className="shape shape-dot shape-dot-2">💛</span>
          </div>

          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                AI Smart <span className="text-highlight">Study</span><br />
                Planner
              </h1>
              <p className="hero-subtitle">
                Boost your study efficiency with AI!
              </p>
              <button type="button" className="btn-get-started">
                Get Started
              </button>
            </div>

            <div className="hero-image">
              <img
                src={mascotImg}
                alt="AI Study Planner mascot"
                className="mascot-img"
              />
            </div>
          </div>
        </section>

        {/* ── Features Section ──────────────────────── */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-icon feature-icon-blue">
              <span className="feature-emoji">📋</span>
            </div>
            <h3 className="feature-title">Personalized Study Plans</h3>
            <p className="feature-desc">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-orange">
              <span className="feature-emoji">🔔</span>
            </div>
            <h3 className="feature-title">Task Reminders</h3>
            <p className="feature-desc">
              Lorem ipsum dolor sit amet, csectetuer adipiscing elit, sed diam nonummy
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-teal">
              <span className="feature-emoji">📊</span>
            </div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-desc">
              Lorem ipsum dolor sit amet, ossectetuer adipiscing elit, sed diam nonummy
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
