import { useRef } from 'react'

export function usePointerTilt(strength = 10) {
  const ref = useRef(null)

  const onMove = (event) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * strength
    const rotateX = (0.5 - y) * strength
    node.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`
  }

  const onLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)'
  }

  return { ref, onMove, onLeave }
}
