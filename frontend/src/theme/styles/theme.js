// theme.js

import { injectGlobal } from 'styled-components'

injectGlobal(`
  @font-face: 
    {
      font-family: 'Cardo', serif;
      font-family: 'Oswald', sans-serif;
      src: url('https://fonts.googleapis.com/css?family=Oswald|Quattrocento|Cardo:400,700|Montserrat:900|Work+Sans:300')
    }
`)

const blue = '#07c'
const slate = '#262626'
const secondhandgrey = '#3f3f3f'
const whitish = '#f5f5f5'

export default {
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    blue,
    lightgray: '#dcdcdc',
    slate,
    secondhandgrey,
    whitish
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    sans: 'Oswald, sans-serif',
    serif: 'Quattrocento, serif',
    cardo: 'Cardo, serif',
    mont: 'Montserrat, sans-serif',
    work: 'Work Sans, sans-serif'
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)'
  },
  buttons: {
    primary: {
      color: '#fff',
      backgroundColor: blue
    },
    outline: {
      color: blue,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px'
    }
  },
  NavItem: {
    height: '50px'
  }
}
