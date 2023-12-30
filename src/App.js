import { useState, useRef, useCallback } from 'react';
import ToDoEdit from './components/ToDoEdit';
import ToDoInsert from './components/ToDoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/ToDoTemplate';

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            text: '리액트 기초 알아보기',
            checked: true,
        },{
            id: 2,
            text: '컴포넌트 스타일링 하기',
            checked: true,
        },{
            id: 3,
            text: '투두리스트 만들기',
            checked: false,
        },
    ])
    
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [insertToggle, setInsertToggle] = useState(false); // 플래그 역할을 해줄 state
    
    // useRef(초기값) 여기서는 useRef 를 로컬 변수로 활용했습니다.
    // 로컬변수 : 렌더링과 상관없이 바뀔 수 있는 값
    // useRef 의 current 속성은 인자로 넘어온 초기값을 current 에 할당합니다.
    // useRef 는 current 값이 바뀌어도 컴포넌트가 리렌더링 되지 않고, 컴포넌트가 리렌더링 되어도 current의 값을 잃지 않는다는 장점이 있습니다.
    const nextId = useRef(4);
    const onInsertToggle = useCallback(() => {
        if(selectedTodo) {
            setSelectedTodo((selectedTodo) => null);
        }
        setInsertToggle((prev) => !prev);
    }, [selectedTodo]);
    
    const onChangeSelectedTodo = (todo) => {
        setSelectedTodo((selectedTodo) => todo);
    };

    const onInsert = useCallback(
        (text) => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            setTodos((todos) => todos.concat(todo)); // concat(): 인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열 반환
            nextId.current++; // nextId 1씩 더하기
        },
        [],
    );

    const onRemove = useCallback((id) =>
        { setTodos((todos) => todos.filter((todo) => todo.id !== id))
        }, []);

    const onUpdate = useCallback((id, text) => {
        onInsertToggle(); // 팝업창을 꺼주는 역할을 합니다.

        setTodos((todos) => todos.map((todo) => (todo.id === id ? {...todo, text} : todo)),
        );
    },
    [onInsertToggle],);
        
    const onToggle = useCallback(
        (id) => {
            setTodos((todos) =>
                todos.map((todo) => 
                todo.id === id ? {...todo, checked: !todo.checked } : todo,
                ),
            );
        },
        [],
    );

    return (
        <TodoTemplate> 
            {/* 앱을 이루는 컨테이너 박스  */}
            <ToDoInsert onInsert={onInsert}/> 
            {/* 할 일 입력창 */}
                <TodoList
                todos={todos}
                onToggle={onToggle}
                onRemove={onRemove}
                onChangeSelectedTodo={onChangeSelectedTodo}
                onInsertToggle={onInsertToggle}
                /> 
                {/* 할 일 목록 (ul) */}
                {insertToggle && (
                    <ToDoEdit 
                    onInsert={onInsert}
                    selectedTodo={selectedTodo}
                    onInsertToggle={onInsertToggle}
                    onUpdate={onUpdate}
                    insertToggle={insertToggle}
                    />
                )}
        </TodoTemplate>
    );
}

export default App;