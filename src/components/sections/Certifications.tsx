
import { certifications } from '../../data/certifications'
import InfiniteCarousel from '../ui/InfiniteCarousel'

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="certifications-section section-divider"
    >
      <div className="container-custom certifications-container">

        {/* Section heading */}
        <header className="certifications-header">
          <h2
            id="certifications-heading"
            className="certifications-heading section-heading"
          >
            Certifications
          </h2>
        </header>

        {/* Carousel content */}
        <div className="certifications-content">
          <InfiniteCarousel
            className="certifications-carousel"
            ariaLabel="Certifications gallery"
          >
            {certifications.map((certificate) => (
              <article
                key={certificate.id}
                className="certification-item"
              >
                {/* Certificate image */}
                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certification-image-link"
                  aria-label={`View ${certificate.title}`}
                  draggable={false}
                >
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    loading="lazy"
                    draggable={false}
                    className="certification-image"
                  />
                </a>

                {/* Certificate information */}
                <h3 className="certification-title">
                  {certificate.title}
                </h3>

                <p className="certification-meta">
                  {certificate.issuer} · {certificate.date}
                </p>
              </article>
            ))}
          </InfiniteCarousel>
        </div>

      </div>
    </section>
  )
}
