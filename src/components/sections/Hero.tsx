
import { ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../../data/profile'

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="hero"
    >
      <div className="container-custom hero-container">
        <div className="hero-label">
          My Portfolio
        </div>

        <div className="hero-content">
          <div className="hero-intro">

            {/* Decorative pinned paper — light mode only */}
            <div
              className="hero-pinned-paper"
              aria-hidden="true"
            />

            <div className="hero-name-area">
              <p className="hero-name-label">
                Name:
              </p>

              <h1
                id="hero-heading"
                className="hero-name"
                aria-label={profile.name}
              >
                {profile.nameLines.map((line, index) => (
                  <span
                    key={index}
                    aria-hidden="true"
                  >
                    {line}
                    {index === profile.nameLines.length - 1 && (
                      <span className="hero-name-period">
                        .
                      </span>
                    )}
                  </span>
                ))}
              </h1>
            </div>

            <div className="hero-tagline-area">
              <p className="small-text hero-tagline">
                {profile.tagline}
              </p>
            </div>

            <div className="hero-actions">
              <a href="#contact" className="hero-contact">
                Contact Me
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                />
              </a>

              <a
                href={profile.resumeUrl}
                download
                className="hero-resume"
              >
                <Download
                  size={17}
                  aria-hidden="true"
                />
                Download Résumé
              </a>
            </div>
          </div>

          <div className="hero-portrait">
            <div className="hero-portrait-frame">
              <img
                src={profile.profileImage}
                alt={`Portrait of ${profile.name}`}
                className="hero-portrait-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
