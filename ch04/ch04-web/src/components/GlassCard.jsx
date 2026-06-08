import { css } from '@emotion/react';

const cardStyle = css`
    position: relative;
    width: 420px;
    max-width: 90vw;
    padding: 2px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin: 20px auto;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: conic-gradient(
            transparent, 
            transparent, 
            transparent, 
            #4a90e2, 
            #9013fe, 
            transparent 30%
        );
        animation: rotate 4s linear infinite;
        opacity: 0;
        transition: opacity 0.4s;
        z-index: 1;
    }

    &:hover {
        transform: translateY(-8px);
    }

    &:hover::before {
        opacity: 1;
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
`;

const innerStyle = css`
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(20, 20, 35, 0.4);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 14px;
    padding: 40px;
    z-index: 2;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;

    /* To ensure elements inside the card stay above the glow */
    & > * {
        position: relative;
        z-index: 3;
    }
`;

function GlassCard({ children }) {
    return (
        <div css={cardStyle}>
            <div css={innerStyle}>
                {children}
            </div>
        </div>
    );
}

export default GlassCard;
