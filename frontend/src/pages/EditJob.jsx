import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { jobsAPI } from '../services/api'
import './PostJob.css'

const EditJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    qualification: '',
    responsibilities: '',
    location: '',
    salary: '',
    job_type: 'Full-Time',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      setFetching(true)
      const data = await jobsAPI.getJob(id)
      const job = data.job
      setFormData({
        title: job.title || '',
        description: job.description || '',
        qualification: job.qualification || '',
        responsibilities: job.responsibilities || '',
        location: job.location || '',
        salary: job.salary || '',
        job_type: job.job_type || 'Full-Time',
      })
      setError('')
    } catch (err) {
      setError('Failed to fetch job details')
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await jobsAPI.updateJob(id, {
        ...formData,
        salary: Number(formData.salary),
      })
      navigate(`/jobs/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="post-job-page">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="post-job-page">
      <div className="container">
        <h1 className="page-title">Edit Job</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g., New York, NY"
                />
              </div>

              <div className="form-group">
                <label htmlFor="salary">Salary *</label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 80000"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="job_type">Job Type *</label>
                <select
                  id="job_type"
                  name="job_type"
                  value={formData.job_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Job Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Describe the job position..."
                rows="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="responsibilities">Responsibilities *</label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                required
                placeholder="List the key responsibilities..."
                rows="5"
              />
            </div>

            <div className="form-group">
              <label htmlFor="qualification">Qualifications *</label>
              <textarea
                id="qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                placeholder="List the required qualifications..."
                rows="5"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Job'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/jobs/${id}`)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditJob

