# Styled Components (parte 01)

É uma ferramenta de estilização do tipo CSS-in-JS. Onde o css é escrito na sintaxe JS/TS

```bash
npm i styled-components
```

As declarações de tipagens ficam em outro pacote

```bash
npm i @types/styled-components -D
```

## Estrutura de estilização por classes utilizando props

```tsx
// App

import { Button } from './components/Button'

export function App() {
  return (
    <>
      <Button color="primary" />
      <Button color="secondary" />
      <Button color="danger" />
      <Button color="success" />
      <Button />
    </>
  )
}
```

```tsx
// Button

import Styles from './Button.module.css'

interface ButtonProps {
  color?: 'primary' | 'secondary' | 'danger' | 'success'
}

export function Button({ color = 'primary' }: ButtonProps) {
  return <button className={`${Styles.button} ${Styles[color]}`}>Enviar</button>
}
```

```css
// Button.module.css

.button {
  width: 100px;
  height: 40px;
}

.primary {
  background: purple;
}

.secondary {
  background: blue;
}

.danger {
  background: red;
}

.success {
  background: green;
}
```

## Estrutura do componente estilizado

```tsx
// App
import { Button } from './components/Button'

export function App() {
  return (
    <>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />
    </>
  )
}
```

```tsx
// Button.tsx
import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
```

```ts
// Button.style.ts
import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonVariant = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
  success: 'green'
}

//Letra maiúscula no nome, pois este arquivo está criando um componente, de fato
export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${props => {
    return css`
      background: ${ButtonVariant[props.variant]};
    `
  }}
`
```

## Gestão de temas com styled-components (parte 1.2)

Podemos definir inúmeros temas e esses temas são controlados por JS/TS

```tsx
// App.tsx

import { ThemeProvider } from 'styled-components'
import { Button } from './components/Button'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" />
      <Button variant="secondary" />
      <Button variant="danger" />
      <Button variant="success" />
      <Button />
    </ThemeProvider>
  )
}
```

```tsx
// Button.tsx

import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
```

```ts
// Button.styles.ts
import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonVariant = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
  success: 'green'
}

//Letra maiúscula no nome, pois este arquivo está criando um componente, de fato
export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  border-radius: 8px;
  border: none;
  margin: 8px;

  background: ${props => props.theme.primary};
  color: ${props => props.theme.white};
`
```

```ts
// default.ts

export const defaultTheme = {
  primary: '#084e6e',
  secondary: 'purple',
  white: '#fff'
}
```

## Tipagem de temas (parte 1.3)

Os temas já podem ser criados na pasta themes, mas ainda não estão tipados propriamente.

## Extensão 'd.ts'

Dentro do aruqivo vai existir apenas comandos específicos de typescript, não pode ter JS, muito menos HTML.

```ts
import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

// Com este comando, todas as vezes que o 'styled-components' for importando, a tipagem do tema já estará definida
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
```

# Configurando ESLint (Parte 2)

Ecma Script Linting.
LInting = processo que valida se o código está seguindo padrões de escrita estipulados previamente. Por exemplo, usar ponto e vírgula, aspas simples ou duplas. Muito utilizado quando há uma equipe grande trabalhando no mesmo código (onde cada um tem seus hábitos de escrita, mas o código final precisa ser padronizado).

Instalação:

```bash
npm i eslint -D
```

Configuração criada pelo tima da Rocketseat:

```bash
npm i @rocketseat/eslint-config -D
```

Para criar uma configuração personalizada:

```bash
npx eslint --init
```

Serão feitas várias perguntas via terminal

Para utilizar:

```bash
npx eslint src --ext .ts,.tsx
```

node, eslint, nome da pasta, --ext (extensions), extensões dos arquivos que queremos verificar.

Para corrigir todos os erros:

```bash
npx eslint src --ext .ts,.tsx --fix
```
