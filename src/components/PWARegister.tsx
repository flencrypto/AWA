'use client'

import { useEffect } from 'react'

export function PWARegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Proactively check for a new version
        if (typeof registration.update === 'function') {
          registration.update()
        }
        registration.addEventListener('updatefound', () => {
          const installing = registration.installing
          if (!installing) return
          installing.addEventListener('statechange', () => {
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              console.info('TWATS: a new version is available — reload to update.')
            }
          })
        })
      })
      .catch((err) => {
        console.error('SW registration failed:', err)
      })
  }, [])
  return null
}
