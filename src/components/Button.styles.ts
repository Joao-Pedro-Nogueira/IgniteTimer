import styled, {css} from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant
}

const ButtonVariant = {
 primary: 'purple',
 secondary: 'blue',
 danger: 'red',
 success: 'green',
}

//Letra maiúscula no nome, pois este arquivo está criando um componente, de fato
export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;

  ${props => {
    return css`background: ${ButtonVariant[props.variant]}`
  }}
`