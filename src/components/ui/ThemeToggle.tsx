
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')

    if (savedTheme) {
      return savedTheme === 'dark'
    }

    return window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
  })

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode
      ? 'dark'
      : 'light'

    localStorage.setItem(
      'portfolio-theme',
      darkMode ? 'dark' : 'light'
    )
  }, [darkMode])

  return (
    <button
      type="button"
      onClick={() => setDarkMode((current) => !current)}
      aria-label={
        darkMode
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      title={
        darkMode
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      aria-pressed={darkMode}
      className="theme-toggle"
    >
      {darkMode ? (
        <Moon size={22} aria-hidden="true" />
      ) : (
        <Sun size={22} aria-hidden="true" />
      )}
    </button>
  )
}
