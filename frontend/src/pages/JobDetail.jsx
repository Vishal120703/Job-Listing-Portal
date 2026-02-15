import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { jobsAPI, applicationAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './JobDetail.css'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [applying, setApplying] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      setLoading(true)
      const data = await jobsAPI.getJob(id)
      setJob(data.job)
      setError('')
    } catch (err) {
      setError('Failed to fetch job details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      setApplying(true)
      setError('')
      const result = await applicationAPI.applyToJob(id)
      setApplySuccess(true)
      setError('')
    } catch (err) {
      const errorMessage = err.response?.data?.msg || err.response?.data?.message || 'Failed to apply for job'
      setError(errorMessage)
      setApplySuccess(false)
    } finally {
      setApplying(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) {
      return
    }

    try {
      await jobsAPI.deleteJob(id)
      navigate('/jobs')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job')
    }
  }

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(salary)
  }

  const isOwner = user && job && job.employer?._id === user._id

  if (loading) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  if (error && !job) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
          <Link to="/jobs" className="btn btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <div className="alert alert-error">Job not found</div>
          <Link to="/jobs" className="btn btn-primary">
            Back to Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <Link to="/jobs" className="back-link">← Back to Jobs</Link>

        {error && !applySuccess && <div className="alert alert-error">{error}</div>}
        {applySuccess && (
          <div className="alert alert-success">
            ✅ Application submitted successfully! You will be contacted by the employer soon.
          </div>
        )}

        <div className="job-detail-card">
          <div className="job-detail-header">
            <div>
              <h1 className="job-detail-title">{job.title}</h1>
              <div className="job-detail-meta">
                <span className="job-type-badge">{job.job_type}</span>
                <span>📍 {job.location}</span>
                <span>💰 {formatSalary(job.salary)}</span>
              </div>
            </div>
            {isOwner ? (
              <div className="job-actions">
                <Link to={`/edit-job/${job._id}`} className="btn btn-secondary">
                  Edit Job
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Job
                </button>
              </div>
            ) : user ? (
              <button
                onClick={handleApply}
                className="btn btn-primary"
                disabled={applying || applySuccess}
              >
                {applying ? 'Applying...' : applySuccess ? 'Applied!' : 'Apply Now'}
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login to Apply
              </Link>
            )}
          </div>

          <div className="job-detail-content">
            <section className="job-section">
              <h2>Job Description</h2>
              <p className="job-text">{job.description}</p>
            </section>

            <section className="job-section">
              <h2>Responsibilities</h2>
              <p className="job-text">{job.responsibilities}</p>
            </section>

            <section className="job-section">
              <h2>Qualifications</h2>
              <p className="job-text">{job.qualification}</p>
            </section>

            {job.employer && (
              <section className="job-section">
                <h2>Employer</h2>
                <p className="job-text">
                  {job.employer.name || job.employer.username}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetail


