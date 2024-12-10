import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
    }

    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: auto; 
    }

    body {
         width: 100%;
         min-height: 100vh;
    }

    #root {
        height: 100%;
    }
`;

export default GlobalStyle;
