import { useState } from "react";
import { css } from "@emotion/react";
import GlassCard from "../components/GlassCard";

const headerStyle = css`
    text-align: center;
    margin-bottom: 24px;
`;

const inputContainerStyle = css`
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    width: 100%;
`;

const inputStyle = css`
    margin-bottom: 0 !important;
`;

const addButtonStyle = css`
    width: 80px !important;
`;

const listStyle = css`
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    padding-right: 4px;
    
    /* custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
    }
`;

const itemStyle = (completed) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    margin-bottom: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    span {
        flex-grow: 1;
        cursor: pointer;
        text-decoration: ${completed ? 'line-through' : 'none'};
        color: ${completed ? 'rgba(255, 255, 255, 0.4)' : '#fff'};
        margin-right: 12px;
        word-break: break-all;
    }
`;

const deleteButtonStyle = css`
    width: auto !important;
    padding: 6px 12px !important;
    background: linear-gradient(135deg, #e24a4a, #fe134e) !important;
    font-size: 0.8rem !important;
`;

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleAddTodo = () => {
        if (!inputValue.trim()) return;
        setTodos([
            ...todos,
            { id: Date.now(), text: inputValue, completed: false }
        ]);
        setInputValue("");
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <GlassCard>
            <h1 css={headerStyle}>Todo List</h1>
            <div css={inputContainerStyle}>
                <input 
                    css={inputStyle}
                    type="text" 
                    placeholder="새로운 할 일을 입력하세요..." 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button css={addButtonStyle} onClick={handleAddTodo}>추가</button>
            </div>
            <ul css={listStyle}>
                {todos.map(todo => (
                    <li key={todo.id} css={itemStyle(todo.completed)}>
                        <span onClick={() => toggleComplete(todo.id)}>
                            {todo.text}
                        </span>
                        <button css={deleteButtonStyle} onClick={() => deleteTodo(todo.id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </GlassCard>
    );
}

export default TodoList;
