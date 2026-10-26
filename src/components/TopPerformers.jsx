import React from 'react'
import '../styles/TopPerformers.css'

function TopPerformers() {
  const performers = [
    { id: 1, name: 'Aarav Sharma', class: 'Class 12', score: '98.5%' },
    { id: 2, name: 'Priya Patel', class: 'Class 10', score: '97.8%' },
    { id: 3, name: 'Rohan Kumar', class: 'Class 12', score: '96.9%' },
    { id: 4, name: 'Ananya Singh', class: 'Class 11', score: '96.5%' },
    { id: 5, name: 'Arjun Reddy', class: 'Class 10', score: '95.7%' },
    { id: 6, name: 'Kavya Iyer', class: 'Class 12', score: '95.2%' }
  ]

  return (
    <section className="top-performers-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Top <span className="highlight">Performers</span></h2>
          <p className="section-description">
            Celebrating dedication, achievement and the pursuit of excellence.
          </p>
        </div>

        <div className="performers-grid">
          {performers.map((performer) => (
            <div key={performer.id} className="performer-card">
              <div className="performer-avatar">
                <div className="avatar-placeholder">
                  {performer.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="performer-name">{performer.name}</h3>
              <p className="performer-class">{performer.class}</p>
              <div className="performer-score">
                <span className="score-label">Score:</span>
                <span className="score-value">{performer.score}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="performers-note">
          * Demo data shown for illustration purposes. Replace with actual authorized student information.
        </p>
      </div>
    </section>
  )
}

export default TopPerformers
