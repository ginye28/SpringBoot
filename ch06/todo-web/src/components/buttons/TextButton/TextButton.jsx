import * as s from "./styles";

function TextButton({ children, onClick, disabled,  weight }) {

    return(
        <button css={s.button(weight)} onClick={onclick} disabled={disabled}>
            {children}
        </button>
    )
}

export default TextButton;