import { useState } from 'react'
import './App.css'
import LoginPage from './LoginPage'

type Page = 'home' | 'login' | 'signup'

function App() {
  const [page, setPage] = useState<Page>('home')

  if (page === 'login') {
    return (
      <LoginPage
        onNavigateHome={() => setPage('home')}
        onNavigateSignup={() => setPage('signup')}
      />
    )
  }

  return (
    <div className="page">
      {/* ── Navbar ──────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => setPage('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="9" r="4" fill="#fff" opacity="0.9" />
              <rect x="8" y="14" width="8" height="6" rx="2" fill="#fff" opacity="0.9" />
              <circle cx="9" cy="9" r="1" fill="#7c3aed" />
              <circle cx="15" cy="9" r="1" fill="#7c3aed" />
            </svg>
          </div>
          <div className="logo-text-wrap">
            <span className="logo-ai">AI</span>
            <span className="logo-study"> Study</span>
            <div className="logo-sub">Planner</div>
          </div>
        </div>

        <div className="nav-center">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How It Works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#about" className="nav-link">About Us</a>
          <a href="#tips" className="nav-link">Study Tips</a>
        </div>

        <div className="nav-actions">
          <button className="btn-login" onClick={() => setPage('login')}>Log in</button>
          <button className="btn-signup-nav" onClick={() => setPage('signup')}>Sign Up Free</button>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-blob" />
        <div className="hero-dots-grid" />

        <div className="hero-left">
          <div className="welcome-badge">
            <span>👋</span> Welcome to AI Study Planner
          </div>

          <h1 className="hero-title">
            Plan Smarter.<br />
            Study Better.<br />
            <span className="hero-title-accent">Achieve More.</span>
          </h1>

          <p className="hero-desc">
            AI Study Planner creates personalized study plans, tracks
            your progress, and helps you stay consistent with smart
            reminders and AI-powered insights.
          </p>

          <div className="hero-cta-row">
            <button className="btn-get-started" onClick={() => setPage('signup')}>Get Started Free →</button>
            <button className="btn-watch-demo">
              <span className="play-icon">▶</span> Watch Demo
            </button>
          </div>

          <div className="hero-perks">
            <div className="perk">
              <div className="perk-icon perk-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="perk-title">Personalized Plans</div>
                <div className="perk-sub">AI crafted for you</div>
              </div>
            </div>
            <div className="perk">
              <div className="perk-icon perk-purple">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <div>
                <div className="perk-title">Smart Reminders</div>
                <div className="perk-sub">Never miss a task</div>
              </div>
            </div>
            <div className="perk">
              <div className="perk-icon perk-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <div>
                <div className="perk-title">Track Progress</div>
                <div className="perk-sub">Stay on top always</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img src="/phone-mockup.png" alt="AI Study Planner App Preview" className="phone-mockup-img" />
          <div className="float-brain">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
            </svg>
          </div>
          <div className="float-clip">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Trusted By ───────────────────────────────────────── */}
      <div className="trusted-section">
        <p className="trusted-label">Trusted by students from</p>
        <div className="trusted-logos">
          <div className="trust-logo google-logo">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Google</span>
          </div>
          <div className="trust-logo coursera-logo">
            <span className="coursera-text">coursera</span>
          </div>
          <div className="trust-logo udacity-logo">
            <span className="udacity-text">UDACITY</span>
          </div>
          <div className="trust-logo stanford-logo">
            <span className="stanford-text">Stanford<br />University</span>
          </div>
          <div className="trust-logo harvard-logo">
            <div className="harvard-shield">H</div>
            <span className="harvard-text">HARVARD<br />UNIVERSITY</span>
          </div>
        </div>
      </div>

      {/* ── Stats Section ───────────────────────────────────── */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-icon stat-icon-purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Students</div>
            <div className="stat-sub">Trust our platform</div>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-icon stat-icon-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Study Sessions</div>
            <div className="stat-sub">Completed successfully</div>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-icon stat-icon-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
            <div className="stat-sub">Students love AI Planner</div>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-icon stat-icon-orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-number">120+</div>
            <div className="stat-label">Countries</div>
            <div className="stat-sub">Worldwide community</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
