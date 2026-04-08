import type { CSSProperties } from 'react'

export const D = {
  blue:     '#0065f4',
  blueBg:   '#eaf3ff',
  blueDot:  '#367df7',
  navy:     '#003149',
  text:     '#0f172a',
  body:     '#64748b',
  muted:    '#90a5ba',
  label:    '#667788',
  green:    '#00c357',
  greenBg:  '#deffe8',
  bg:       '#f8fbff',
  white:    '#ffffff',
  track:    '#e2e8f0',
  resultBg: '#F3F4F6',
  thumb:    '#2563eb',
  shadow:   '0 4px 17.7px rgba(234,239,251,0.85)',
} as const

export const pill: CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  background: '#eaf3ff', borderRadius: 100,
  padding: '7px 24px', width: 'fit-content',
}
