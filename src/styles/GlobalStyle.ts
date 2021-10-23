import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  #root {
    display: flex;
    flex-direction: column;
  }
  button {
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
