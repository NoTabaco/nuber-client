import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap');
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
    //   font-family: 'Maven Pro', sans-serif;
         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    input,
    button {
        &:focus, 
        &:active {
            outline: none;
        }
    }
`;
