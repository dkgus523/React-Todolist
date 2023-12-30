import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
  MdModeEditOutline,
} from 'react-icons/md';
import './ToDoListItem.scss';
import cn from 'classnames';

function ToDoListItem({ todo, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle, style }) {
    const { id, text, checked } = todo;
    return (
        <div className="TodoListItem-virtualized" style={style}>
            <li className="TodoListItem">
                <div 
                className={cn('checkbox', { checked:checked })}
                onClick={() => onToggle(id)}
                > 
                    {/* checked=true 일 때 checked 라는 class 를 추가 */}
                    { checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank /> }
                    {/* checked=true 면 체크된 박스 아이콘이 false 면 빈 박스 아이콘이 뜸 */}
                    <div className="text">{text}</div>
                </div>
                <div className="edit" onClick={() =>
                {onChangeSelectedTodo(todo)
                    onInsertToggle();
                }
                }>
                    <MdModeEditOutline />
                </div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </li>
        </div>
    )
}

export default React.memo(ToDoListItem);

// classnames(cn) 함수 예시
// classNames('foo', 'bar'); => 'foo bar'
// classNames('foo', {bar: true}); => 'foo bar'
// classNames('foo', {bar: false}); => 'foo'
