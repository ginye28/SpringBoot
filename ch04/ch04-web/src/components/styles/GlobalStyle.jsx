import { Global, css } from '@emotion/react';

const globalStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #050510;
        color: #ffffff;
        font-family: 'Inter', 'Roboto', sans-serif;
        overflow: hidden; /* Hide default scrollbar to handle custom parallax */
        width: 100vw;
        height: 100vh;
    }

    a {
        color: #4a90e2;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    a:hover {
        color: #a0cfff;
    }

    ul, li {
        list-style: none;
    }

    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-weight: 600;
        color: #e0e0e0;
    }

    input {
        width: 100%;
        padding: 12px 16px;
        margin-bottom: 16px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        color: #ffffff;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
    }
    input:focus {
        border-color: #4a90e2;
        background: rgba(255, 255, 255, 0.1);
        box-shadow: 0 0 8px rgba(74, 144, 226, 0.5);
    }
    input::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    button {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #4a90e2, #9013fe);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(144, 19, 254, 0.4);
    }
    button:disabled {
        background: #333344;
        color: #777;
        cursor: not-allowed;
    }
`;

function GlobalStyle() {
    return <Global styles={globalStyle} />;
}

export default GlobalStyle;
