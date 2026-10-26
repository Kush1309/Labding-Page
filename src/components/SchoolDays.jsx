import React from 'react'
import '../styles/SchoolDays.css'

// ─────────────────────────────────────────────────────────────────────────────
// School Days Gallery Data
// Each item has: id, title, category, description, image, imageAlt, size
// ─────────────────────────────────────────────────────────────────────────────
const activities = [
  {
    id: 1,
    title: 'Classroom Learning',
    category: 'Academics',
    description: 'Dynamic smart-classrooms fostering active questions, curiosity, and deep conceptual clarity.',
    image: '/images/school-days/classroom-learning.jpg',
    imageAlt: 'Vibrant modern classroom with students actively participating and smiling teacher guiding them',
    size: 'large',
  },
  {
    id: 2,
    title: 'Student Activities',
    category: 'STEM & Discovery',
    description: 'Hands-on laboratory experiments and collaborative projects.',
    image: '/images/school-days/student-activities.jpg',
    imageAlt: 'High school students wearing lab coats conducting a colorful science experiment',
    size: 'small',
  },
  {
    id: 3,
    title: 'Teacher Interaction',
    category: 'Mentorship',
    description: 'Dedicated one-on-one attention encouraging every learner to shine.',
    image: '/images/school-days/teacher-interaction.jpg',
    imageAlt: 'Caring teacher encouraging a young student at her desk',
    size: 'small',
  },
  {
    id: 4,
    title: 'School Events',
    category: 'Celebration',
    description: 'Annual cultural showcases, performances, and student triumphs.',
    image: '/images/school-days/school-events.jpg',
    imageAlt: 'School annual day award ceremony with students celebrating on stage with trophy',
    size: 'small',
  },
  {
    id: 5,
    title: 'Sports Activities',
    category: 'Athletics & Spirit',
    description: 'Energizing field games that instill team camaraderie and fitness.',
    image: '/images/school-days/sports-activities.jpg',
    imageAlt: 'Students joyfully playing football on a lush green outdoor field',
    size: 'small',
  },
]

function SchoolDays() {
  return (
    <section id="about" className="school-days-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Our <span className="highlight">School Days</span></h2>
          <p className="section-description">
            Every school day is an opportunity to learn, explore, grow, and achieve lifelong memories.
          </p>
        </div>

        <div className="gallery-grid">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`gallery-item ${activity.size}`}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={activity.image}
                  alt={activity.imageAlt}
                  className="gallery-img"
                  loading={activity.size === 'large' ? 'eager' : 'lazy'}
                />
                <div className="gallery-gradient-scrim" />
                <div className="gallery-content">
                  <span className="gallery-badge">{activity.category}</span>
                  <h3 className="gallery-title">{activity.title}</h3>
                  <p className="gallery-desc">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SchoolDays

