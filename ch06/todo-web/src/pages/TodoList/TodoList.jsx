import { useParams } from "react-router";
import { useTodoList } from "../../hooks/queries/useTodos";
import * as s from "./styles";
import { useCategories, useCategoryNotCompletedCount } from "../../hooks/queries/useCategory";
import Header from "../../components/Header/Header";
import TextButton from "../../components/buttons/TextButton/TextButton";
import { PRIORITIES } from "../../constants/globalConstants";
import { useTodoCompleteMutation } from "../../hooks/mutations/useTodo";
import { useMe } from "../../hooks/queries/useUser";

function TodoList() {
    const { categoryName } = useParams();   //path의 이름 (app.jsx)
    const meQuery = useMe();
    const categoriesQuery = useCategories();
    const categoryId = categoriesQuery.isLoading 
        || categoriesQuery.data.body.find(c => c.categoryName === categoryName).categoryId;

    const category = categoriesQuery.isLoading || categoriesQuery.data.body.find(c => c.categoryName === categoryName);

    const todoListQuery = useTodoList();
    const todoList = (todoListQuery.isLoading && [])
        || todoListQuery.data.body.filter(todo => todo.categoryId === category.categoryId);
    const completedTodoList = todoList.filter(todo => todo.completed);
    const notCompletedTodoList = todoList.filter(todo => !todo.completed);
    const categoryCountsQuery = useCategoryNotCompletedCount();
    const notCompletedCount = categoryCountsQuery.data?.body.find(c => c.id === category.categoryId).notCompletedCount;
    const completedCount = categoryCountsQuery.data?.body.find(c => c.id === category.categoryId).totalCount - notCompletedCount;

    console.log(notCompletedCount);
    console.log(completedCount);

    const updateCompletionMutation = useTodoCompleteMutation();

    const handleCompleteOnClick = (currentChecked, todoId) => {
        updateCompletionMutation.mutateAsync({
            todoId: todoId,
            userId: meQuery.data.body.useId,
            completed: !currentChecked,
        });
    }

    return(
        <div css={s.layout}>
            <Header>
                <TextButton>&lt; 홈</TextButton>
                <h4>{category.categoryName}</h4>
                <TextButton>...</TextButton>
            </Header>
            <main css={s.main}>
                <div css={s.header(category.categoryColor)}>
                    <div>{category.categoryIcon}</div>
                    <div>
                        <div>{category.categoryName}</div>
                        <div>{notCompletedCount}개의 할 일</div>
                    </div>
                </div>
                <ul css={s.notCompletedUl}>
                    {
                        notCompletedTodoList.map(todo => (
                            <li>
                                <div>
                                    <input type="checkBox" checked={todo.completed} onClick={() => handleCompleteOnClick(todo.completed, todo.todoId)} />
                                </div>
                                <div>
                                    <div>
                                        <div>{todo.title}</div>
                                        <div>
                                            {PRIORITIES.find(p => p.id === todo.priority).icon}
                                        </div>
                                    </div>
                                    <div>{todo.dueDate} {todo.dueTime}</div>
                                    <div>{todo.memo}</div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <div>
                    완료됨 {completedCount}개
                </div>
                <ul css={s.completedUl}>
                    {
                        completedTodoList.map(todo => (
                            <li>
                                <div>
                                    <input type="checkBox" checked={todo.completed} onClick={() => handleCompleteOnClick(todo.completed, todo.todoId)}/>
                                </div>
                                <div>{todo.title}</div>
                            </li>
                        ))
                    }
                </ul>
            </main>
        </div>
    )
}

export default TodoList;