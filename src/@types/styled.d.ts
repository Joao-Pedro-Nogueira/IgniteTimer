import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// Com este comando, todas as vezes que o 'styled-components' for importando, a tipagem do tema já estará definida
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
