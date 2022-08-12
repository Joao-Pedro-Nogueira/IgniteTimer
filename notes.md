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

# Rotas no ReactJS (parte 3)

## React Router DOM (3.1)

Utilizado para definir as páginas ao digitar nos links. Ex: www.site.com/store/products

```bash
npm i react-router-dom
```

```tsx
// App

import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

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
```

```tsx
// Router

import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History'
import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
```

Rotas para os componentes Home e History (que estão dentro do diretório pages)

## Layout de rotas (3.2)

Nesta aplicação, o Header é igual em todas as páginas, portanto, não faz sentido colocar o elemento Header dentro de cada página para ser recarregado o tempo todo, sendo que ele já está carregado em tela antes de mudar/ recarregar a página.

```tsx
// Router.tsx
import { Routes, Route } from 'react-router-dom'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { DefaultLayout } from './pages/layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
```

```tsx
// App

import { ThemeProvider } from 'styled-components'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'

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
```

```tsx
// DefaultLayout.tsx

import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

export function DefaultLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      {/* Este é o elemento que recebe o conteúdo variável */}
    </div>
  )
}
```

# Controlled vs Uncontrolled (parte 04)

## Controled

Manter, em tempo real, a informação que o usuário insere na nossa aplicação dentro do estado, dentro de uma variável no componente.
Então toda vez que o usuário escrever ou atualizar algo no input, a informação no estado será atualizada, contendo o novo valor, para ter o valor sempre atualizado.

```tsx
import { useState } from 'react'

export function Form() {
  const [task, setTask] = useState('')

  return (
    <textarea
      onChange={setTask(event.target.value)}
      value={task}
    />
    <button type="submit" disabled={task === ''}>Enviar</button>
  )
}
```

## Uncontroled

A informação sobre o valor do input será buscada apenas quando ela for necessária.

# React Hook Form (parte 5)
