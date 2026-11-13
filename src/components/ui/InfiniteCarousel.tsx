
import {
  Children,
  useEffect,
  useRef,
  useState,
} from 'react'

import type {
  MouseEvent,
  PointerEvent,
  ReactNode,
} from 'react'

interface InfiniteCarouselProps {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

export default function InfiniteCarousel({
  children,
  className = '',
  ariaLabel = 'Infinite carousel',
}: InfiniteCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const sequenceRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)

  const dragRef = useRef({
    active: false,
    pointerId: -1,
    lastX: 0,
    totalMovement: 0,
  })

  const suppressClickRef = useRef(false)

  const items = Children.toArray(children)
  const copies = [0, 1, 2]

  /* -------------------------------------------------------
     01. NORMALIZE INFINITE SCROLL POSITION
     ------------------------------------------------------- */

  const normalizeScroll = () => {
    const carousel = carouselRef.current
    const sequence = sequenceRef.current

    if (!carousel || !sequence) return

    const sequenceWidth =
      sequence.getBoundingClientRect().width

    if (sequenceWidth <= 0) return

    /*
     * Keep the viewport around the middle copy.
     * Moving by one full sequence is visually
     * seamless because every copy is identical.
     */

    if (carousel.scrollLeft < sequenceWidth * 0.5) {
      carousel.scrollLeft += sequenceWidth
    } else if (
      carousel.scrollLeft >= sequenceWidth * 1.5
    ) {
      carousel.scrollLeft -= sequenceWidth
    }
  }

  /* -------------------------------------------------------
     02. INITIALIZE CAROUSEL
     ------------------------------------------------------- */

  useEffect(() => {
    const carousel = carouselRef.current
    const sequence = sequenceRef.current

    if (!carousel || !sequence || items.length === 0) {
      return
    }

    let previousWidth = 0

    /*
     * Set the initial position to the middle
     * sequence and preserve relative position
     * when the carousel is resized.
     */

    const updateDimensions = () => {
      const width =
        sequence.getBoundingClientRect().width

      if (width <= 0) return

      if (previousWidth === 0) {
        carousel.scrollLeft = width
      } else if (
        Math.abs(width - previousWidth) > 0.5
      ) {
        const progress =
          carousel.scrollLeft / previousWidth

        carousel.scrollLeft = progress * width
      }

      previousWidth = width
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(
      updateDimensions
    )

    resizeObserver.observe(sequence)
    resizeObserver.observe(carousel)

    return () => {
      resizeObserver.disconnect()
    }
  }, [items.length])

  /* -------------------------------------------------------
     03. START MOUSE DRAGGING
     ------------------------------------------------------- */

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.pointerType !== 'mouse' ||
      event.button !== 0
    ) {
      return
    }

    const carousel = carouselRef.current
    if (!carousel) return

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      totalMovement: 0,
    }

    suppressClickRef.current = false

    carousel.setPointerCapture(event.pointerId)

    setIsDragging(true)
  }

  /* -------------------------------------------------------
     04. FREE MOUSE DRAGGING
     ------------------------------------------------------- */

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const carousel = carouselRef.current
    const drag = dragRef.current

    if (!carousel || !drag.active) return
    if (event.pointerId !== drag.pointerId) return

    const delta = event.clientX - drag.lastX

    drag.lastX = event.clientX
    drag.totalMovement += Math.abs(delta)

    if (drag.totalMovement > 5) {
      suppressClickRef.current = true
    }

    carousel.scrollLeft -= delta

    normalizeScroll()
  }

  /* -------------------------------------------------------
     05. FINISH MOUSE DRAGGING
     ------------------------------------------------------- */

  const finishDragging = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const carousel = carouselRef.current
    const drag = dragRef.current

    if (!drag.active) return
    if (event.pointerId !== drag.pointerId) return

    drag.active = false

    setIsDragging(false)

    if (
      carousel?.hasPointerCapture(event.pointerId)
    ) {
      carousel.releasePointerCapture(event.pointerId)
    }
  }

  /* -------------------------------------------------------
     06. PREVENT ACCIDENTAL IMAGE OPENING
     ------------------------------------------------------- */

  const handleClickCapture = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    if (!suppressClickRef.current) return

    event.preventDefault()
    event.stopPropagation()

    suppressClickRef.current = false
  }

  /* -------------------------------------------------------
     07. RENDER
     ------------------------------------------------------- */

  return (
    <div
      ref={carouselRef}
      className={[
        'infinite-carousel',
        isDragging ? 'is-dragging' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={finishDragging}
      onPointerCancel={finishDragging}
      onLostPointerCapture={() => {
        dragRef.current.active = false
        setIsDragging(false)
      }}
      onClickCapture={handleClickCapture}
      onScroll={normalizeScroll}
    >
      {copies.map((copyIndex) => (
        <div
          key={copyIndex}
          ref={
            copyIndex === 0
              ? sequenceRef
              : undefined
          }
          className="infinite-carousel-sequence"
          aria-hidden={copyIndex !== 1}
          inert={copyIndex !== 1}
        >
          {items}
        </div>
      ))}
    </div>
  )
}
