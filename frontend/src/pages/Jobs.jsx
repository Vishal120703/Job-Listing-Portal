import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jobsAPI } from '../services/api'
import './Jobs.css'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    job_type: '',
    minSalary: '',
    maxSalary: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const data = await jobsAPI.getJobs(filters)
      setJobs(data.jobs || [])
      setError('')
    } catch (err) {
      setError('Failed to fetch jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <div className="jobs-page">
      <div className="container">
        <h1 className="page-title">Browse Jobs</h1>

        <div className="jobs-filters">
          <form onSubmit={handleSearch} className="filter-form">
            <div className="filter-row">
              <input
                type="text"
                name="keyword"
                placeholder="Search by job title..."
                value={filters.keyword}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <input
                type="text"
                name="location"
                placeholder="Location..."
                value={filters.location}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <select
                name="job_type"
                value={filters.job_type}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
              <input
                type="number"
                name="minSalary"
                placeholder="Min Salary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <input
                type="number"
                name="maxSalary"
                placeholder="Max Salary"
                value={filters.maxSalary}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="spinner"></div>
        ) : jobs.length === 0 ? (
          <div className="no-jobs">
            <p>No jobs found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <h3 className="job-title">{job.title}</h3>
                  <span className="job-type">{job.job_type}</span>
                </div>
                <div className="job-info">
                  <span className="job-location">📍 {job.location}</span>
                  <span className="job-salary">💰 {formatSalary(job.salary)}</span>
                </div>
                <p className="job-description">
                  {job.description?.substring(0, 150)}...
                </p>
                <div className="job-footer">
                  <Link to={`/jobs/${job._id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Jobs

