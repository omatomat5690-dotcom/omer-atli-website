'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function tint(color: string, alpha: number): string {
  if (!color) return 'rgba(0,0,0,0)'
  if (color.startsWith('oklch(')) return `oklch(${color.slice(6, -1).trim()} / ${alpha})`
  return color
}

export default function SiteEffects() {
  const pathname = usePathname()

  // Background aurora canvas — runs once, persists across navigation.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.documentElement.setAttribute('data-direction', 'aurora')
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null
    if (!canvas || reduce) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const root = document.documentElement
    let W = 0, H = 0, DPR = 1, t = 0, raf = 0
    let blobs: { x: number; y: number; r: number; dx: number; dy: number; hue: number }[] = []

    const readAccent = () => {
      const cs = getComputedStyle(root)
      return { glow: cs.getPropertyValue('--accent-glow').trim(), accent: cs.getPropertyValue('--accent').trim() }
    }
    const build = () => {
      blobs = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random(), y: Math.random(), r: 0.28 + Math.random() * 0.3,
        dx: (Math.random() - 0.5) * 0.00006, dy: (Math.random() - 0.5) * 0.00006, hue: i,
      }))
    }
    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.width = window.innerWidth * DPR
      H = canvas.height = window.innerHeight * DPR
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      build()
    }
    const frame = () => {
      t += 0.6
      ctx.clearRect(0, 0, W, H)
      const ac = readAccent()
      for (const b of blobs) {
        b.x += b.dx * 32 + Math.sin(t * 0.004 + b.hue) * 0.00008
        b.y += b.dy * 32 + Math.cos(t * 0.004 + b.hue) * 0.00008
        if (b.x < -0.3) b.x = 1.3
        if (b.x > 1.3) b.x = -0.3
        if (b.y < -0.3) b.y = 1.3
        if (b.y > 1.3) b.y = -0.3
        const cx = b.x * W, cy = b.y * H, rad = b.r * Math.min(W, H)
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        const col = b.hue % 2 === 0 ? ac.glow : ac.accent
        g.addColorStop(0, tint(col, 0.1))
        g.addColorStop(1, tint(col, 0))
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(cx, cy, rad, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    frame()
    const onVis = () => { if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame) }
    document.addEventListener('visibilitychange', onVis)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // Scroll-reveal, magnetic hover, topic glow, newsletter canvas — re-bind per route.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups: Array<() => void> = []

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', (i % 6) * 70 + 'ms')
      io.observe(el)
    })
    cleanups.push(() => io.disconnect())

    // Failsafe: never let `.reveal` content stay hidden. If the observer is slow
    // or doesn't fire for some element, force everything visible after a moment.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'))
    }, 1600)
    cleanups.push(() => clearTimeout(failsafe))

    if (!reduce && window.matchMedia('(pointer:fine)').matches) {
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const strength = parseFloat(el.dataset.magnetic || '0.3') || 0.3
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect()
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`
        }
        const leave = () => { el.style.transform = '' }
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', leave)
        cleanups.push(() => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) })
      })
      document.querySelectorAll<HTMLElement>('.topic').forEach((card) => {
        const glow = card.querySelector<HTMLElement>('.glow')
        if (!glow) return
        const move = (e: MouseEvent) => {
          const r = card.getBoundingClientRect()
          glow.style.left = e.clientX - r.left + 'px'
          glow.style.top = e.clientY - r.top + 'px'
        }
        card.addEventListener('mousemove', move)
        cleanups.push(() => card.removeEventListener('mousemove', move))
      })
    }

    // newsletter node-network canvas
    const nc = document.getElementById('news-canvas') as HTMLCanvasElement | null
    if (nc && !reduce) {
      const ctx = nc.getContext('2d')
      if (ctx) {
        let w = 0, h = 0, raf = 0
        let pts: { x: number; y: number; vx: number; vy: number }[] = []
        const d = Math.min(window.devicePixelRatio || 1, 2)
        const rs = () => {
          const r = nc.parentElement!.getBoundingClientRect()
          w = nc.width = r.width * d
          h = nc.height = r.height * d
          nc.style.width = r.width + 'px'
          nc.style.height = r.height + 'px'
          pts = Array.from({ length: 40 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.12 * d, vy: (Math.random() - 0.5) * 0.12 * d }))
        }
        const f = () => {
          ctx.clearRect(0, 0, w, h)
          const ac = getComputedStyle(document.documentElement).getPropertyValue('--accent-glow').trim()
          const inner = ac.startsWith('oklch(') ? ac.slice(6, -1).trim() : null
          const line = inner ? `oklch(${inner} / 0.16)` : 'rgba(220,160,120,0.16)'
          const node = inner ? `oklch(${inner} / 0.5)` : 'rgba(220,160,120,0.5)'
          for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1 }
          const lim = 130 * d
          for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i], b = pts[j], dist = Math.hypot(a.x - b.x, a.y - b.y)
            if (dist < lim) { ctx.strokeStyle = line; ctx.lineWidth = 1; ctx.globalAlpha = 1 - dist / lim; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
          }
          ctx.globalAlpha = 1; ctx.fillStyle = node
          for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 * d, 0, 7); ctx.fill() }
          raf = requestAnimationFrame(f)
        }
        rs()
        window.addEventListener('resize', rs)
        f()
        cleanups.push(() => { cancelAnimationFrame(raf); window.removeEventListener('resize', rs) })
      }
    }

    return () => cleanups.forEach((fn) => fn())
  }, [pathname])

  return (
    <>
      <canvas id="bg-canvas" aria-hidden="true" />
      <div className="bg-wash" aria-hidden="true" />
    </>
  )
}
