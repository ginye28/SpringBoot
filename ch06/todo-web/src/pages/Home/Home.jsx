import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";


function Home() {
    const meQuery = useMe();

    return(
        <div css={s.layout}>
            <Header>
                <h2 css={s.title}>ReMind</h2>
                <div css={s.profile(meQuery.data?.body.profileImage)}></div>
            </Header>
            <div css={s.main}>
                <div css={s.boxGroup}>
                    <div css={s.box}>

                    </div>
                    <div css={s.box}>

                    </div>
                    <div css={s.box}>

                    </div>
                    <div css={s.box}>

                    </div>
                </div>
                <div css={s.listGroup}>
                    <header>
                        <h3>나의 목록</h3>
                        <TextButton>편집</TextButton>
                    </header>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;