import { PacmanLoader } from "react-spinners";
import * as s from "./styles";


function Spinners() {

    return(
        <div css={s.layout}>
           <PacmanLoader color="#fffb00"/>
        </div>
    )
}

export default Spinners;