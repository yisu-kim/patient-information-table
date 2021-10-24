import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }
  @font-face {
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap')
  }
  html,
  body,
  #root {
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
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
