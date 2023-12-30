import { useCallback, useEffect, useState } from "react";
import './ToDoEdit.scss';

function ToDoEdit({ insertToggle, selectedTodo, onUpdate }) {
    const [value, setValue] = useState('');
    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);
    const onSubmit = useCallback(
        (e) => {
            onUpdate(selectedTodo.id, value);
            setValue(''); // value 초기화
            // 기본이벤트(새로고침) 방지
            e.preventDefault();
        },
        [onUpdate, value],
        // 이거 React Hook useEffect has a missing dependency 오류 생김? 돌아가긴한다고...
    );

    useEffect(() => {
        if(selectedTodo) {
            setValue(selectedTodo.text);            
        }
    }, [selectedTodo])

    return (
        <div className="background">
            <form onSubmit={onsubmit} className="todoedit__insert">
                <h2>수정하기</h2>
                <input onChange={onchange} value={value} placeholder="할 일을 입력하세요." />
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}

export default ToDoEdit;