
import { useEffect, useRef } from 'react'

/* =========================================================
   CURSOR TRAIL — NEON BLUE OUTLINED STARS
   ========================================================= */

type Star = {
  x: number
  y: number
  size: number
  rotation: number
  driftX: number
  driftY: number
  createdAt: number
  duration: number
}

const MAX_STARS = 24
const SPAWN_DISTANCE = 18

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    if (!context) return

    const pointerQuery = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    )

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    if (!pointerQuery.matches || motionQuery.matches) {
      return
    }

    let stars: Star[] = []
    let animationFrame = 0
    let lastX: number | null = null
    let lastY: number | null = null
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      const ratio = Math.min(
        window.devicePixelRatio || 1,
        2
      )

      width = window.innerWidth
      height = window.innerHeight

      canvas.width = width * ratio
      canvas.height = height * ratio

      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const drawStar = (
      x: number,
      y: number,
      radius: number
    ) => {
      const innerRadius = radius * 0.45

      context.beginPath()

      for (let point = 0; point < 10; point++) {
        const angle =
          -Math.PI / 2 + (point * Math.PI) / 5

        const distance =
          point % 2 === 0 ? radius : innerRadius

        const px = x + Math.cos(angle) * distance
        const py = y + Math.sin(angle) * distance

        if (point === 0) {
          context.moveTo(px, py)
        } else {
          context.lineTo(px, py)
        }
      }

      context.closePath()
      context.stroke()
    }

    const animate = (time: number) => {
      context.clearRect(0, 0, width, height)

      const starColor =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-cursor-trail')
          .trim() || '#38BFFF'

      stars = stars.filter(
        star => time - star.createdAt < star.duration
      )

      for (const star of stars) {
        const progress = Math.min(
          (time - star.createdAt) / star.duration,
          1
        )

        const opacity = (1 - progress) * 0.65
        const movement = progress * progress

        context.save()

        context.translate(
          star.x + star.driftX * movement,
          star.y + star.driftY * movement
        )

        context.rotate(
          star.rotation + progress * 0.25
        )

        context.globalAlpha = opacity
        context.strokeStyle = starColor
        context.lineWidth = 1.25
        context.lineJoin = 'round'
        context.shadowColor = starColor
        context.shadowBlur = 5

        drawStar(0, 0, star.size / 2)

        context.restore()
      }

      animationFrame = requestAnimationFrame(animate)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return

      const { clientX: x, clientY: y } = event

      if (lastX !== null && lastY !== null) {
        const distance = Math.hypot(
          x - lastX,
          y - lastY
        )

        if (distance < SPAWN_DISTANCE) return
      }

      lastX = x
      lastY = y

      const size =
        Math.random() < 0.12
          ? 17 + Math.random() * 2
          : 7 + Math.random() * 9

      stars.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size,
        rotation: (Math.random() - 0.5) * 0.7,
        driftX: (Math.random() - 0.5) * 14,
        driftY: -5 - Math.random() * 12,
        createdAt: performance.now(),
        duration: 600 + Math.random() * 200,
      })

      if (stars.length > MAX_STARS) {
        stars.shift()
      }
    }

    const handlePointerLeave = () => {
      lastX = null
      lastY = null
    }

    resize()

    animationFrame = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener(
      'pointerleave',
      handlePointerLeave
    )

    return () => {
      cancelAnimationFrame(animationFrame)

      window.removeEventListener('resize', resize)
      window.removeEventListener(
        'pointermove',
        handlePointerMove
      )
      document.removeEventListener(
        'pointerleave',
        handlePointerLeave
      )
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}
