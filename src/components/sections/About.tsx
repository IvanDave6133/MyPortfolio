
import { profile } from '../../data/profile'

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about-section section-divider"
    >
      <div className="container-custom about-container">
        <header className="about-header">
          <h2
            id="about-heading"
            className="section-heading about-heading"
          >
            About Me
          </h2>
        </header>

        <div className="about-content">
          <p className="section-paragraph about-biography">
            {profile.biography}
          </p>
        </div>
      </div>
    </section>
  )
}
