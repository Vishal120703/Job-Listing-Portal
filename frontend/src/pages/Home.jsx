import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Dream Job Today</h1>
            <p className="hero-subtitle">
              Connect with top employers and discover opportunities that match your skills
            </p>
            <div className="hero-actions">
              {!user ? (
                <>
                  <Link to="/signup" className="btn btn-primary btn-large">
                    Get Started
                  </Link>
                  <Link to="/jobs" className="btn btn-outline btn-large">
                    Browse Jobs
                  </Link>
                </>
              ) : (
                <Link to="/jobs" className="btn btn-primary btn-large">
                  Browse Jobs
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find jobs that match your skills and preferences with our advanced search filters</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Top Employers</h3>
              <p>Connect with leading companies and startups looking for talented professionals</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Apply</h3>
              <p>Apply to multiple jobs with just one click using your saved profile</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

