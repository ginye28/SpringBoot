import { Link } from "react-router";
import TextButton from "../../components/buttons/TextButton/TextButton";
import Header from "../../components/Header/Header";
import Spinners from "../../components/Spinners/Spinners";
import { useCategories, useCategoryColorsAndIcons, useCategoryNotCompletedCount } from "../../hooks/queries/useCategory";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";
import { useBottomModalStore } from "../../store/modalStore";
import { useState } from "react";
import { useCategoryDeleteMutation, useCategoryRegisterMutation } from "../../hooks/mutations/useCategory";

function Home() {
    const meQuery = useMe();
    const categoiesQuery = useCategories();
    const categoryNotCompletedCountQuery = useCategoryNotCompletedCount();
    const categoryDeleteMutation = useCategoryDeleteMutation();

    const setModalOpen = useBottomModalStore((state) => state.setOpen);
    const setModalChildren = useBottomModalStore((state) => state.setChildren);

    const [ isEdit, setEdit ] = useState(false);

    const handleCategoryDeleteOnClick = (e, id) => {
        categoryDeleteMutation.mutateAsync(id);
    }

    const handleChangeModeOnClick = (state) => {
        setEdit(state);
    }

    const handleCategoryRegisterOnClick = () => {
        setModalOpen(true);
        setModalChildren(<CategoryRegister />);
    }

    return (
        <div css={s.layout}>
            <Header>
                <h2 css={s.title}>ReMind</h2>
                <div css={s.profile(meQuery.data?.body.profileImage)}></div>
            </Header>
            <div css={s.main}>
                <div css={s.boxGroup}>

                </div>
                <div css={s.listGroup(isEdit)}>
                    <header>
                        <h3>나의 목록</h3>
                        {
                            isEdit 
                            ? <TextButton onClick={() => handleChangeModeOnClick(false)}>완료</TextButton>
                            : <TextButton onClick={() => handleChangeModeOnClick(true)}>편집</TextButton>
                        }
                    </header>
                    <ul>
                        {
                            categoiesQuery.isLoading
                            ? <></>
                            : categoiesQuery.data.body.map(category => (
                                <li key={category.categoryId}>
                                    <div onClick={(e) => handleCategoryDeleteOnClick(e, category.categoryId)}>
                                        <div>
                                            <svg data-dc-tpl="122" width="10" height="2" viewBox="0 0 10 2" fill="none"><rect data-dc-tpl="123" width="10" height="2" rx="1" fill="white"></rect></svg>
                                        </div>
                                    </div>
                                    <Link to={`/categories/${category.categoryName}/todos`}>
                                        <div css={s.categoryIcon(category.categoryColor)}>{category.categoryIcon}</div>
                                        <div css={s.categoryName}>{category.categoryName}</div>
                                        <div css={s.categoryCount}>
                                            <span>
                                                {
                                                    categoryNotCompletedCountQuery.isLoading || 
                                                    categoryNotCompletedCountQuery.data.body
                                                    .find(count => count.id === category.categoryId)
                                                    ?.notCompletedCount || "0"
                                                }
                                            </span>
                                            <svg data-dc-tpl="128" width="8" height="13" viewBox="0 0 8 13" fill="none" style={{"margin-left": "4px"}}><path data-dc-tpl="129" d="M1 1l6 5.5L1 12" stroke="#C7C7CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <TextButton onClick={handleCategoryRegisterOnClick}>새로운 목록 추가</TextButton>
                </div>
            </div>
        </div>
    )
}

export default Home;

function CategoryRegister() {
    const colorsAndIconsQuery = useCategoryColorsAndIcons();
    const setModalOpen = useBottomModalStore((state) => state.setOpen);
    const meQuery = useMe();
    const categoryRegisterMutation = useCategoryRegisterMutation();
    const [ newCategory, setNewCategory ] = useState({
        categoryName: "",
        colorId: 1,
        iconId: 1,
    });
    const colors = colorsAndIconsQuery.data?.body.categoryColors ?? [];
    const icons = colorsAndIconsQuery.data?.body.categoryIcons ?? [];

    const selected = {
        color: colors.find(c => c.id === newCategory.colorId)?.color,
        icon: icons.find(i => i.id === newCategory.iconId)?.icon,
    }

    const handleInputOnChange = (e) => {
        setNewCategory(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleRadioOnChange = (e, id) => {
        setNewCategory(prev => ({
            ...prev,
            [e.target.name]: id,
        }))
    }

    const handleRegisterOnClick = () => {
        const data = {
            userId: meQuery.data.body.userId,
            name: newCategory.categoryName,
            colorId: newCategory.colorId,
            iconId: newCategory.iconId,
        }
        categoryRegisterMutation.mutateAsync(data);
        setModalOpen(false);
    }

    return <div>
        <header css={s.modalHeader}>
            <h3>새로운 목록</h3>
            <div css={s.categoryIcon(selected.color)}>{selected.icon}</div>
        </header>
        <div css={s.modalInput}>
            <svg data-dc-tpl="312" width="16" height="16" viewBox="0 0 16 16" fill="none"><path data-dc-tpl="313" d="M2 8h12M2 4.5h12M2 11.5h8" stroke="#8E8E93" stroke-width="1.8" stroke-linecap="round"></path></svg>
            <input type="text" 
                placeholder="목록 이름" 
                name="categoryName" 
                value={newCategory.categoryName} 
                onChange={handleInputOnChange} />
        </div>
        <div css={s.modalListTitle}>색상</div>
        <div css={s.colorGroup}>
            {
                colors.map(c => (
                    <label key={c.id} css={s.categoryColorLabel(c.color)}>
                        <input type="radio" 
                            name="colorId" 
                            checked={c.color === selected.color}
                            onChange={(e) => handleRadioOnChange(e, c.id)} />
                        <div></div>
                    </label>
                ))
            }
        </div>
        <div css={s.modalListTitle}>아이콘</div>
        <div css={s.iconGroup}>
            {
                icons.map(i => (
                    <label key={i.id} css={s.categoryIconLabel}>
                        <input type="radio" 
                            name="iconId" 
                            checked={i.icon === selected.icon}
                            onChange={(e) => handleRadioOnChange(e, i.id)} />
                        <div>{i.icon}</div>
                    </label>
                ))
            }
        </div>
        <div css={s.modalButtonGroup(selected.color)}>
            <button onClick={() => setModalOpen(false)}>취소</button>
            <button onClick={handleRegisterOnClick}>추가</button>
        </div>
    </div>
}
