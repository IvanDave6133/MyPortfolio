
import type { CSSProperties } from 'react'
import { getTechnologyIcon } from '../../data/technologyIcons'

/* =========================================================
   TECHNOLOGY BADGE
   ========================================================= */

interface TechnologyBadgeProps {
  technology: string
  iconOnly?: boolean
  className?: string
}

/* ---------------------------------------------------------
   01. COMPONENT
   --------------------------------------------------------- */

export default function TechnologyBadge({
  technology,
  iconOnly = false,
  className = '',
}: TechnologyBadgeProps) {
  const Icon = getTechnologyIcon(technology)

  const badgeClassName = [
    'project-modal-technology',
    iconOnly ? 'is-icon-only' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconStyle: CSSProperties = {
    flexShrink: 0,
  }

  return (
    <span
      className={badgeClassName}
      title={technology}
      aria-label={iconOnly ? technology : undefined}
    >
      <Icon
        className="technology-badge-icon"
        size={17}
        style={iconStyle}
        aria-hidden="true"
      />

      {!iconOnly && (
        <span className="technology-badge-label">
          {technology}
        </span>
      )}
    </span>
  )
}
