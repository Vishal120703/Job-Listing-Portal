import { useState, useEffect } from 'react'
import { profileAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import './Profile.css'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    bio: '',
    skills: '',
    experience: '',
    education: '',
    profileImage: null,
    resume: null,
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const data = await profileAPI.getProfile()
      setProfile(data)
      if (data.otherDetails) {
        setFormData({
          phone: data.otherDetails.phone || '',
          address: data.otherDetails.address || '',
          bio: data.otherDetails.bio || '',
          skills: data.otherDetails.skills || '',
          experience: data.otherDetails.experience || '',
          education: data.otherDetails.education || '',
          profileImage: null,
          resume: null,
        })
      }
      setError('')
    } catch (err) {
      setError('Failed to fetch profile')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      await profileAPI.updateProfile(formData)
      setSuccess('Profile updated successfully!')
      setEditing(false)
      fetchProfile()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    }
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="profile-card">
          <div className="profile-header">
            <div>
              {profile?.otherDetails?.profileImage ? (
                <img
                  src={profile.otherDetails.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="profile-image-placeholder">
                  {user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="profile-info">
              <h2>{user?.name || user?.username}</h2>
              <p>{user?.email}</p>
              <p className="profile-role">Role: {user?.role || 'N/A'}</p>
            </div>
            {!editing && (
              <button
                onClick={() => setEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills</label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="List your skills (comma-separated)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Experience</label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Describe your work experience"
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label htmlFor="education">Education</label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="Describe your education background"
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="profileImage">Profile Image</label>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="resume">Resume (PDF)</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {profile?.otherDetails?.resume && (
                <div className="resume-link">
                  <a
                    href={profile.otherDetails.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    View Current Resume
                  </a>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false)
                    fetchProfile()
                  }}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-section">
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> {profile?.otherDetails?.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> {profile?.otherDetails?.address || 'Not provided'}</p>
              </div>

              <div className="detail-section">
                <h3>Bio</h3>
                <p>{profile?.otherDetails?.bio || 'No bio provided'}</p>
              </div>

              <div className="detail-section">
                <h3>Skills</h3>
                <p>{profile?.otherDetails?.skills || 'No skills listed'}</p>
              </div>

              <div className="detail-section">
                <h3>Experience</h3>
                <p>{profile?.otherDetails?.experience || 'No experience listed'}</p>
              </div>

              <div className="detail-section">
                <h3>Education</h3>
                <p>{profile?.otherDetails?.education || 'No education listed'}</p>
              </div>

              {profile?.otherDetails?.resume && (
                <div className="detail-section">
                  <h3>Resume</h3>
                  <a
                    href={profile.otherDetails.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    View Resume
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile

