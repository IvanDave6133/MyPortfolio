
import {
  Mail,
  Code2,
  BriefcaseBusiness,
  Users,
  Phone,
  ExternalLink,
  Download,
} from 'lucide-react'

import { contact } from '../../data/contact'
import { profile } from '../../data/profile'

/* =========================================================
   CONTACT SECTION
   ========================================================= */

export default function Contact() {
  /* -------------------------------------------------------
     01. CONTACT LINKS
     ------------------------------------------------------- */

  const socialLinks = [
    {
      label: 'GitHub',
      href: contact.github,
      icon: Code2,
    },
    {
      label: 'LinkedIn',
      href: contact.linkedin,
      icon: BriefcaseBusiness,
    },
    {
      label: 'Facebook',
      href: contact.facebook,
      icon: Users,
    },
    {
      label: 'Phone',
      href: contact.phone
        ? `tel:${contact.phone}`
        : undefined,
      icon: Phone,
    },
  ].filter(link => Boolean(link.href))

  const hasSocialLinks =
    socialLinks.length > 0 ||
    (contact.otherLinks?.length ?? 0) > 0

  /* -------------------------------------------------------
     02. RENDER
     ------------------------------------------------------- */

  return (
    <section
      id="contact"
      className="contact-section section-divider"
      aria-labelledby="contact-heading"
    >
      <div className="container-custom contact-container">
        <div className="contact-content">

          {/* -----------------------------------------------
              LEFT COLUMN — INTRODUCTION & EMAIL
             ----------------------------------------------- */}

          <div className="contact-main">

            {/* Heading and description */}

            <header className="contact-header">
              <h2
                id="contact-heading"
                className="contact-heading"
              >
                Have something in mind?
              </h2>

              <p className="contact-description">
                I'm open to conversations about projects,
                collaboration, and opportunities.
                Feel free to reach out.
              </p>
            </header>

            {/* Primary contact information */}

            {contact.email && (
              <div className="contact-primary">
                <p className="contact-eyebrow">
                  Get in Touch
                </p>

                <a
                  href={`mailto:${contact.email}`}
                  className="contact-email"
                  aria-label={`Send an email to ${contact.email}`}
                >
                  <Mail
                    size={21}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />

                  <span>{contact.email}</span>
                </a>
              </div>
            )}

            {/* Downloadable résumé */}

            <div className="contact-resume">
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

          {/* -----------------------------------------------
              RIGHT COLUMN — SOCIAL LINKS
             ----------------------------------------------- */}

          {hasSocialLinks && (
            <div className="contact-aside">
              <nav
                className="contact-socials"
                aria-label="Contact and social links"
              >
                {socialLinks.map(link => {
                  const Icon = link.icon

                  const isExternal =
                    link.href?.startsWith('https://') ||
                    link.href?.startsWith('http://')

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        isExternal ? '_blank' : undefined
                      }
                      rel={
                        isExternal
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="contact-social-link"
                    >
                      <Icon
                        size={19}
                        strokeWidth={1.7}
                        aria-hidden="true"
                      />

                      <span>{link.label}</span>
                    </a>
                  )
                })}

                {contact.otherLinks?.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <ExternalLink
                      size={19}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />

                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
