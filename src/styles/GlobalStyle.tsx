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

    button {
        cursor: pointer;
    }

    /* Toastify css */
    .Toastify__toast-container {
        z-index: 9999;  
    }

    .Toastify__toast.Toastify__toast--default,
    .Toastify__toast.Toastify__toast--success,
    .Toastify__toast.Toastify__toast--info,
    .Toastify__toast.Toastify__toast--warning,
    .Toastify__toast.Toastify__toast--error {
        border-radius: 8px;
        padding: 16px;
        width: fit-content;  
        min-width: fit-content;  
        white-space: nowrap; 
        margin: 0 auto;  
        position: relative;  /* close 버튼의 위치 기준점 */
    }

    .Toastify__close-button {
        position: absolute;  
        right: 8px;        
        top: 8px;           
        color: #979797;
        opacity: 0.7;
        padding-left: 12px;  /* 텍스트와의 간격 */
    }

    .Toastify__toast--info {
       background-color: rgb(39, 39, 39);
        color: white;
    }

    .Toastify__toast--success {
        background-color: rgba(0, 0, 0, 0.9);
        color: white;
    }

    .Toastify__toast--warning {
        background-color: rgba(255, 242, 0, 0.9);
        color: black;
    }

    .Toastify__toast--error {
        border : 2px solid red;
        color: red;
    }

    @keyframes Toastify__slideIn {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
    }

    @keyframes Toastify__slideOut {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
    }

    .Toastify__slide-enter {
        animation: Toastify__slideIn 1s cubic-bezier(0.1, 0, 0.1, 1);
    }

    .Toastify__slide-exit {
        animation: Toastify__slideOut 1s cubic-bezier(0.1, 0, 0.1, 1);
    }
`;

export default GlobalStyle;
