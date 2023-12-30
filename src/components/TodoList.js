
import React, { useCallback } from 'react';
import ToDoListItem from './ToDoListItem';
import './TodoList.scss';
import {List} from 'react-virtualized'

function TodoList({ todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle }) {
    const rowRender = useCallback(
        ({index, key, style}) => {
            const todo = todos[index];
            return (
                <ToDoListItem
                todo={todo}
                key={key}
                onToggle={onToggle}
                onRemove={onRemove}
                onInsertToggle={onInsertToggle}
                onChangeSelectedTodo={onChangeSelectedTodo}
                style={style}
                />
            )
        },
        [todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle]
    )
    return (
        <List 
        className='TodoList'
        width={512} // 전체너비
        height={513}// 전체 높이
        rowCount={todos.length}//항목갯수
        rowHeight={57} // 항목 높이
        rowRenderer={rowRender} //항목을 렌더링할 때 쓰는 함수
        list={todos}//배열
        style={{outline:'none'}} //List에 기본 적용되는 outline 스타일 제거
        />
    )
}

export default React.memo(TodoList);

{/* <ul className="TodoList">
{todos.map((todo) => (
    <TodoListItem
        todo={todo}
        key={todo.id}
    />
))}
</ul> */}
// map() 메서드로 todos 배열의 각 항목들을 ToDoListItem 컴포넌트로 가공해줍니다.
// ToDoListItem 에 체크유무, 텍스트, id 를 props 로 전달해줍니다.

