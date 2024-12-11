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

    .draggable {
        pointer-events: auto; /* 드래그 중에도 클릭 이벤트 활성화 */
    }

    .dragging {
        pointer-events: none; /* 드래그 중에는 클릭 차단 (선택적) */
    }
`;

export default GlobalStyle;
