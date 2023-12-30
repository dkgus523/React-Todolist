import "./ToDoInsert.scss";
import {MdAdd} from 'react-icons/md'
import { useCallback, useState } from "react";

function ToDoInsert({onInsert}) {
    const [value, setValue] = useState('');
    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[])
    // 입력창에 친 값들 추척해서 setValue로 value에 저장한다.
    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue(''); // value 초기화
            // 기본이벤트(새로고침) 방지
            e.preventDefault();
        }
    ,[onInsert, value])
    // 나중에 todos 배열에 새 데이터(객체)를 추가하는 함수를 추가해줄 것이다
    return (
        <form className="TodoInsert" onSubmit={onsubmit}>
            <input
                onChange={onChange}
                value={value} placeholder="할 일을 입력하세요" />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    )
}
// useCallback ?
// 컴포넌트는 자신의 state 혹은 부모에게서 받은 props가 변경될 때마다 리렌더링됩니다.
// 근데 굳이 렌더링 안해도 괜찮은 부분까지 리렌더링 되면 코스트 낭비로 이어질 수 있고, 거기에 리렌더링 될때마다 함수도 다시 생성되는 불상사가 일어납니다.
// 이를 방지하기 위해 전에 생성된 함수를 다시 재활용할 수 있도록 해주는 기능입니다.
//  useCallback(생성하고 싶은 함수, [배열 안의 값이 바뀌었을 때 함수가 새로 생성됩니다.])

export default ToDoInsert;