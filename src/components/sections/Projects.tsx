
import { useState } from 'react'
import { ChevronRight, ChevronUp } from 'lucide-react'

import { projects } from '../../data/projects'
import ProjectModal from '../ui/ProjectModal'

import type { Project } from '../../types'

/* =========================================================
   PROJECTS SECTION
   ========================================================= */

/*
   Features:
   - Three projects visible initially
   - See more occupies the fourth grid column
   - Expanded gallery displays all projects
   - See less appears below expanded gallery
   - Clicking a project opens its details modal
   - Closing the modal preserves gallery state
*/

const INITIAL_PROJECT_COUNT = 3

export default function Projects() {
  /* -------------------------------------------------------
     01. COMPONENT STATE
     ------------------------------------------------------- */

  const [isExpanded, setIsExpanded] = useState(false)

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null)

  /* -------------------------------------------------------
     02. VISIBLE PROJECTS
     ------------------------------------------------------- */

  const visibleProjects = isExpanded
    ? projects
    : projects.slice(0, INITIAL_PROJECT_COUNT)

  const hasMoreProjects =
    projects.length > INITIAL_PROJECT_COUNT

  /* -------------------------------------------------------
     03. GALLERY CONTROLS
     ------------------------------------------------------- */

  const toggleExpanded = () => {
    setIsExpanded((previous) => !previous)
  }

  /* -------------------------------------------------------
     04. MODAL CONTROLS
     ------------------------------------------------------- */

  const openProject = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProject = () => {
    setSelectedProject(null)
  }

  /* -------------------------------------------------------
     05. RENDER
     ------------------------------------------------------- */

  return (
    <>
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className={[
          'projects-section',
          'section-divider',
          isExpanded ? 'is-expanded' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="container-custom projects-container">

          {/* Section heading */}
          <header className="projects-header">
            <h2
              id="projects-heading"
              className="projects-heading section-heading"
            >
              Projects
            </h2>
          </header>

          {/* Projects content */}
          <div className="projects-content">

            {/* Project gallery */}
            <div
              id="projects-gallery-content"
              className="projects-gallery"
            >
              {visibleProjects.map((project) => {
                const previewImage = project.images[0]

                return (
                  <article
                    key={project.id}
                    className="project-item"
                  >
                    <button
                      type="button"
                      className="project-item-inner"
                      onClick={() => openProject(project)}
                      aria-label={`View details for ${project.title}`}
                      aria-haspopup="dialog"
                    >
                      {/* Project preview */}
                      <div className="project-image-wrapper">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt={`${project.title} preview`}
                            className="project-image"
                            loading="lazy"
                            draggable={false}
                          />
                        ) : (
                          <div
                            className="project-image-placeholder"
                            aria-hidden="true"
                          />
                        )}
                      </div>

                      {/* Project title */}
                      <h3 className="project-item-title">
                        {project.title}
                      </h3>

                    </button>
                  </article>
                )
              })}

              {/* Fourth grid column: See more */}
              {hasMoreProjects && !isExpanded && (
                <div className="projects-more-cell">
                  <button
                    type="button"
                    className="projects-toggle"
                    onClick={toggleExpanded}
                    aria-expanded={false}
                    aria-controls="projects-gallery-content"
                  >
                    <span>See more</span>

                    <ChevronRight
                      size={18}
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* See less below expanded gallery */}
            {hasMoreProjects && isExpanded && (
              <div className="projects-toggle-wrapper">
                <button
                  type="button"
                  className="projects-toggle"
                  onClick={toggleExpanded}
                  aria-expanded={true}
                  aria-controls="projects-gallery-content"
                >
                  <span>See less</span>

                  <ChevronUp
                    size={18}
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Project details modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
        />
      )}
    </>
  )
}
