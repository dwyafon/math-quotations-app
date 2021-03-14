import { css } from 'styled-components'

const screens = {
  sm: 280,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

const breakpoints = Object.keys(screens).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${screens[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export default breakpoints