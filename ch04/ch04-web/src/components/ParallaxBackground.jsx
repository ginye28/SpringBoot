import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const parallaxContainer = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    overflow: hidden;
    background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
`;

// Helper to generate random stars
const generateStars = (count, size, isGlow) => {
    let shadow = '';
    for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        shadow += `${x}px ${y}px ${isGlow ? '2px' : '0'} #FFF, `;
    }
    return shadow.slice(0, -2);
};

const starsSmall = generateStars(700, 1, false);
const starsMedium = generateStars(200, 2, false);
const starsLarge = generateStars(100, 3, true);

const createStarLayer = (size, shadow, speed) => css`
    width: ${size}px;
    height: ${size}px;
    background: transparent;
    box-shadow: ${shadow};
    border-radius: 50%;
    position: absolute;
    top: -1000px;
    left: 0;
    will-change: transform;
    /* Duplicate shadow for continuous effect if we want to loop, but here we just move */
`;

function ParallaxBackground({ offset }) {
    return (
        <div css={parallaxContainer}>
            <div css={createStarLayer(1, starsSmall)} style={{ transform: `translateY(${offset * 0.2}px)` }}></div>
            <div css={createStarLayer(2, starsMedium)} style={{ transform: `translateY(${offset * 0.5}px)` }}></div>
            <div css={createStarLayer(3, starsLarge)} style={{ transform: `translateY(${offset * 0.8}px)` }}></div>
        </div>
    );
}

export default ParallaxBackground;
