import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;  //아래 방향으로 주축 변경
    align-items: center;
    justify-content: space-between;    // 영역 떨구기
    flex-grow: 1;   //자식 요소에 남는 영역
    box-sizing: border-box;  //padding 잡을 때 100% 하려면 넣어줘야 함
    padding: 44px 32px 40px;
    background: linear-gradient(160deg, rgb(12, 20, 69) 0%, rgb(26, 58, 107) 50%, rgb(15, 23, 42) 100%);

    & > footer > p {
        margin: 0;
        font-size: 11px;
        color: #ffffff73;
        cursor: default;
    }
`;

export const main = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & > h1 {
        margin: 20px 0 10px;
        font-size: 40px;
        color: #fff;
    }

    & > p {
        margin: 0;
        font-size: 15px;
        color: #ffffff73;
    }
`;

export const buttonGroup = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 40px;
    width: 100%;
`;

export const loginButton = (color) => css`   //함수로 받아옴
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    width: 100%;
    height: 52px;
    background-color: ${color};
    text-decoration: none;

    & > svg {   //absolute로 margin 잡는 것보다 정확하게 가운데로 보낼 수 있음
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 20px;
    }
`;

export const loginButtonLabel = (color) => css`
    font-size: 15px;
    font-weight: 600;
    color: ${color};
`;



