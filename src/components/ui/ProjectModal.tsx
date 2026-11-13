
import { useEffect, useRef, useState } from 'react'

import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GitBranch,
  X,
} from 'lucide-react'

import type { Project } from '../../types'
import TechnologyBadge from './TechnologyBadge'

import '../../styles/project-modal.css'

/* =========================================================
   PROJECT MODAL
   ========================================================= */

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

/* ---------------------------------------------------------
   01. COMPONENT
   --------------------------------------------------------- */

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const images = project?.images ?? []
  const imageCount = images.length

  /* -------------------------------------------------------
     02. RESET WHEN PROJECT CHANGES
     ------------------------------------------------------- */

  useEffect(() => {
    setActiveImageIndex(0)
    setIsDescriptionExpanded(false)

    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [project?.id])

  /* -------------------------------------------------------
     03. MODAL KEYBOARD AND FOCUS MANAGEMENT
     ------------------------------------------------------- */

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    const previouslyFocusedElement = document.activeElement

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }

      if (event.key === 'ArrowRight' && imageCount > 1) {
        setActiveImageIndex(
          previous => (previous + 1) % imageCount
        )
      }

      if (event.key === 'ArrowLeft' && imageCount > 1) {
        setActiveImageIndex(
          previous => (previous - 1 + imageCount) % imageCount
        )
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )

        const firstElement = focusableElements[0]
        const lastElement =
          focusableElements[focusableElements.length - 1]

        if (!firstElement || !lastElement) {
          event.preventDefault()
          return
        }

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault()
          lastElement.focus()
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow

      document.removeEventListener(
        'keydown',
        handleKeyDown
      )

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus()
      }
    }
  }, [project, onClose, imageCount])

  /* -------------------------------------------------------
     04. IMAGE NAVIGATION
     ------------------------------------------------------- */

  const showPreviousImage = () => {
    if (imageCount > 1) {
      setActiveImageIndex(
        previous => (previous - 1 + imageCount) % imageCount
      )
    }
  }

  const showNextImage = () => {
    if (imageCount > 1) {
      setActiveImageIndex(
        previous => (previous + 1) % imageCount
      )
    }
  }

  /* -------------------------------------------------------
     05. DESCRIPTION TOGGLE
     ------------------------------------------------------- */

  const toggleDescription = () => {
    setIsDescriptionExpanded(previous => !previous)
  }

  if (!project) return null

  /* -------------------------------------------------------
     06. RENDER
     ------------------------------------------------------- */

  return (
    <div
      className="project-modal-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={modalRef}
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
      >
        {/* Close button */}

        <button
          ref={closeButtonRef}
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={22} strokeWidth={1.75} />
        </button>

        <div
          ref={contentRef}
          className="project-modal-content"
        >
          {/* -------------------------------------------
              IMAGE GALLERY
             ------------------------------------------- */}

          <div className="project-modal-gallery">
            <div className="project-modal-image-frame">
              {imageCount > 0 ? (
                <img
                  key={`${project.id}-${activeImageIndex}`}
                  src={images[activeImageIndex]}
                  alt={`${project.title} screenshot ${
                    activeImageIndex + 1
                  } of ${imageCount}`}
                  className="project-modal-image"
                  draggable={false}
                />
              ) : (
                <div className="project-modal-image-empty">
                  No preview available
                </div>
              )}

              {imageCount > 1 && (
                <>
                  <button
                    type="button"
                    className="project-modal-image-prev"
                    onClick={showPreviousImage}
                    aria-label="Previous project image"
                  >
                    <ChevronLeft
                      size={22}
                      strokeWidth={1.75}
                    />
                  </button>

                  <button
                    type="button"
                    className="project-modal-image-next"
                    onClick={showNextImage}
                    aria-label="Next project image"
                  >
                    <ChevronRight
                      size={22}
                      strokeWidth={1.75}
                    />
                  </button>
                </>
              )}
            </div>

            {imageCount > 1 && (
              <div
                className="project-modal-image-indicators"
                aria-label="Project image selection"
              >
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={[
                      'project-modal-image-indicator',
                      index === activeImageIndex
                        ? 'is-active'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() =>
                      setActiveImageIndex(index)
                    }
                    aria-label={`Show image ${index + 1}`}
                    aria-current={
                      index === activeImageIndex
                        ? 'true'
                        : undefined
                    }
                  />
                ))}
              </div>
            )}
          </div>

          {/* -------------------------------------------
              PROJECT INFORMATION
             ------------------------------------------- */}

          <div className="project-modal-information">
            <h2
              id="project-modal-title"
              className="project-modal-title"
            >
              {project.title}
            </h2>

            {/* Description */}

            <div className="project-modal-description-section">
              <div
                id="project-modal-description"
                className={[
                  'project-modal-description-content',
                  isDescriptionExpanded
                    ? 'is-expanded'
                    : 'is-collapsed',
                ].join(' ')}
              >
                <p className="project-modal-description">
                  {project.description}
                </p>

                {isDescriptionExpanded && (
                  <p className="project-modal-contribution">
                    {project.contribution}
                  </p>
                )}
              </div>

              <button
                type="button"
                className="project-modal-description-toggle"
                onClick={toggleDescription}
                aria-expanded={isDescriptionExpanded}
                aria-controls="project-modal-description"
              >
                <span>
                  {isDescriptionExpanded
                    ? 'See less'
                    : 'See more'}
                </span>

                {isDescriptionExpanded ? (
                  <ChevronUp
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>

            {/* -----------------------------------------
                TECHNOLOGIES USED
               ----------------------------------------- */}

            {project.technologies.length > 0 && (
              <div className="project-modal-technologies">
                <h3 className="project-modal-subheading">
                  Technologies Used
                </h3>

                <div className="project-modal-technology-list">
                  {project.technologies.map(technology => (
                    <TechnologyBadge
                      key={technology}
                      technology={technology}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* -----------------------------------------
                PROJECT LINKS
               ----------------------------------------- */}

            {(project.githubUrl || project.liveUrl) && (
              <div className="project-modal-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link project-modal-link-github"
                  >
                    <GitBranch
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />

                    <span>GitHub Repository</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal-link project-modal-link-live"
                  >
                    <ExternalLink
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />

                    <span>Live Website</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
