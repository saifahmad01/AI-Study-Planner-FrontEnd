import { useState } from 'react'
import './LoginPage.css'

interface LoginPageProps {
  onNavigateHome: () => void
  onNavigateSignup: () => void
}

export default function LoginPage({ onNavigateHome, onNavigateSignup }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    { quote: '"AI Study transformed the way I learn. My productivity increased by 200%!"', name: 'Rohan Sharma', role: 'Computer Science Student' },
    { quote: '"The personalized plans helped me ace my finals. Absolutely game-changing!"', name: 'Priya Mehta', role: 'Medical Student' },
    { quote: '"Smart reminders kept me on track. Best study tool I\'ve ever used."', name: 'Alex Johnson', role: 'Engineering Student' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="login-page">
      {/* ── Left Panel ─────────────────────────────────────────── */}
      <div className="login-left">
        {/* Logo */}
        <div className="login-logo" onClick={onNavigateHome}>
          <div className="login-logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#fff" opacity="0.9"/>
            </svg>
          </div>
          <span className="login-logo-ai">AI</span>
          <span className="login-logo-study"> Study</span>
        </div>

        {/* Blobs */}
        <div className="left-blob-1" />
        <div className="left-blob-2" />
        <div className="left-dots" />

        {/* Content */}
        <div className="login-left-content">
          <div className="left-badge">Welcome back! 👋</div>

          <h1 className="left-heading">
            Log in to continue<br />
            your <span className="left-heading-accent">learning</span> journey
          </h1>

          <p className="left-subtext">
            Access your personalized study plans, track progress,<br />
            and achieve your academic goals with AI.
          </p>

          {/* Feature list */}
          <div className="left-features">
            <div className="left-feature-item">
              <div className="left-feature-icon lf-purple">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.2">
                  <rect x="9" y="2" width="6" height="4" rx="1"/><path d="M3 8h18v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>
                </svg>
              </div>
              <div>
                <div className="lf-title">Personalized Plans</div>
                <div className="lf-sub">AI creates the perfect study plan for you</div>
              </div>
            </div>
            <div className="left-feature-item">
              <div className="left-feature-icon lf-blue">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.2">
                  <path d="M11 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-6"/><polyline points="9 11 12 14 22 4"/>
                </svg>
              </div>
              <div>
                <div className="lf-title">Smart Reminders</div>
                <div className="lf-sub">Never miss an important study session</div>
              </div>
            </div>
            <div className="left-feature-item">
              <div className="left-feature-icon lf-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <div>
                <div className="lf-title">Progress Tracking</div>
                <div className="lf-sub">Visualize your growth and stay motivated</div>
              </div>
            </div>
          </div>

          {/* Robot mascot */}
          <div className="left-mascot-wrap">
            <img src="/robot-mascot.png" alt="AI Study Robot" className="left-mascot" />
          </div>
        </div>

        {/* Testimonial card */}
        <div className="testimonial-card">
          <div className="testimonial-quote-icon">"</div>
          <p className="testimonial-text">{testimonials[activeTestimonial].quote}</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">
              {testimonials[activeTestimonial].name.charAt(0)}
            </div>
            <div>
              <div className="testimonial-name">{testimonials[activeTestimonial].name}</div>
              <div className="testimonial-role">{testimonials[activeTestimonial].role}</div>
            </div>
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`t-dot ${i === activeTestimonial ? 't-dot-active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ────────────────────────────────────────── */}
      <div className="login-right">
        <div className="login-card">
          {/* Header */}
          <div className="login-card-header">
            <h2 className="login-card-title">Welcome Back 👋</h2>
            <p className="login-card-sub">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="lf-group">
              <label className="lf-label" htmlFor="login-email">Email Address</label>
              <div className="lf-input-wrap">
                <svg className="lf-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  id="login-email"
                  type="email"
                  className="lf-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="lf-group">
              <label className="lf-label" htmlFor="login-password">Password</label>
              <div className="lf-input-wrap">
                <svg className="lf-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="lf-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lf-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="lf-forgot-row">
              <a href="#forgot" className="lf-forgot">Forgot password?</a>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              id="login-submit-btn"
              className="btn-signin"
              disabled={loading}
            >
              {loading ? (
                <span className="login-spinner" />
              ) : (
                <>Sign In &nbsp;→</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="login-divider">
            <span className="login-divider-line" />
            <span className="login-divider-text">or continue with</span>
            <span className="login-divider-line" />
          </div>

          {/* Social buttons */}
          <div className="social-btns">
            <button className="social-btn" id="google-login-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="social-btn" id="apple-login-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
            <button className="social-btn" id="microsoft-login-btn">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              Microsoft
            </button>
          </div>

          {/* Sign up link */}
          <p className="login-signup-link">
            Don't have an account?{' '}
            <button className="login-signup-btn" onClick={onNavigateSignup}>Sign up</button>
          </p>
        </div>
      </div>
    </div>
  )
}
