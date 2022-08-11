import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { BrowserRouter} from 'react-router-dom'

import { GLobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GLobalStyle />
    </ThemeProvider>
  )
}
