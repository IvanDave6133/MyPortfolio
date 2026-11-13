
import { useEffect, useRef, useState } from 'react'

const navigation = [
  { label: 'Home', id: 'home' },
  { label: 'About Me', id: 'about' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [isRaised, setIsRaised] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const navbarRef = useRef<HTMLElement>(null)

  /* -------------------------------------------------------
     01. ACTIVE SECTION & STICKY STATE
     ------------------------------------------------------- */

  useEffect(() => {
    const updateNavigation = () => {
      const offset = 120
      let current = 'home'

      for (const item of navigation) {
        const section = document.getElementById(item.id)

        if (
          section &&
          section.getBoundingClientRect().top <= offset
        ) {
          current = item.id
        }
      }

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        current = 'contact'
      }

      setActiveSection(current)

      const navbar = navbarRef.current

      if (navbar) {
        const navbarTop =
          navbar.getBoundingClientRect().top

        setIsRaised(
          navbarTop <= 1 && window.scrollY > 0
        )
      }
    }

    updateNavigation()

    window.addEventListener('scroll', updateNavigation, {
      passive: true,
    })

    window.addEventListener('resize', updateNavigation)

    return () => {
      window.removeEventListener(
        'scroll',
        updateNavigation
      )

      window.removeEventListener(
        'resize',
        updateNavigation
      )
    }
  }, [])

  /* -------------------------------------------------------
     02. KEEP ACTIVE TAB VISIBLE
     ------------------------------------------------------- */

  useEffect(() => {
    const container = scrollContainerRef.current

    const activeTab =
      container?.querySelector<HTMLElement>(
        '[aria-current="location"]'
      )

    if (!container || !activeTab) return

    const containerRect =
      container.getBoundingClientRect()

    const tabRect =
      activeTab.getBoundingClientRect()

    let target = container.scrollLeft

    if (tabRect.left < containerRect.left) {
      target -= containerRect.left - tabRect.left
    } else if (tabRect.right > containerRect.right) {
      target += tabRect.right - containerRect.right
    }

    container.scrollTo({
      left: target,
      behavior: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches
        ? 'instant'
        : 'smooth',
    })
  }, [activeSection])

  /* -------------------------------------------------------
     03. HOME NAVIGATION
     ------------------------------------------------------- */

  const handleHomeClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'instant' : 'smooth',
    })

    setActiveSection('home')
  }

  /* -------------------------------------------------------
     04. RENDER
     ------------------------------------------------------- */

  return (
    <nav
      ref={navbarRef}
      aria-label="Main navigation"
      data-nav-style={isRaised ? 'raised' : 'flat'}
      className="navbar-root sticky top-0 z-50 w-full"
    >
      {/* Continuous folder strip behind the tabs */}

      <span
        className="navbar-folder-edge"
        aria-hidden="true"
      />

      {/* Independent horizontal depth line */}

      <span
        className="navbar-folder-line"
        aria-hidden="true"
      />

      {/* Scrollable tabs */}

      <div
        ref={scrollContainerRef}
        className="navbar-scroll flex w-full items-stretch overflow-x-auto"
      >
        {navigation.map((item) => {
          const isActive = activeSection === item.id

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={
                item.id === 'home'
                  ? handleHomeClick
                  : undefined
              }
              aria-current={
                isActive ? 'location' : undefined
              }
              className="navbar-tab flex h-[var(--nav-height)] shrink-0 items-center justify-center px-5 text-xs font-semibold whitespace-nowrap transition-colors sm:px-6 sm:text-sm"
            >
              {/* Shadow behind the trapezoid */}

              <span
                className="navbar-tab-shadow"
                aria-hidden="true"
              />

              {/* Trapezoid surface */}

              <span
                className="navbar-tab-surface"
                aria-hidden="true"
              >
                <span className="navbar-tab-highlight" />
              </span>

              {/* Text */}

              <span className="navbar-tab-label">
                {item.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
