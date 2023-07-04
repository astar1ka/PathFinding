import { useEffect, useRef } from 'react';
import './AddBrushMenu.css';

type Props = {
    [key: string]: any
}

export default function AddBrushMenu({hide, setHide, addBrush}: Props) {
    const nameInput = useRef<HTMLInputElement>(null);
    const colorRInput = useRef<HTMLInputElement>(null);
    const colorGInput = useRef<HTMLInputElement>(null);
    const colorBInput = useRef<HTMLInputElement>(null);
    const weightInput = useRef<HTMLInputElement>(null);

    const addButtonHandler = () => {
        if (nameInput.current && 
            colorRInput.current && 
            colorGInput.current && 
            colorBInput.current &&
            weightInput.current){
            setHide();
            addBrush({
                name: nameInput.current.value,
                color: {
                    R: colorRInput.current.value,
                    G: colorGInput.current.value,
                    B: colorBInput.current.value
                },
                weight: weightInput.current.value
            });
        }
    }

  return (
    <div className={`AddBrushMenu ${(hide)?' hide':''}`}>
        <input className="brushNameInput" ref={nameInput}></input>
        <input className="brushColorInput R" ref={colorRInput}></input>
        <input className="brushColorInput G" ref={colorGInput}></input>
        <input className="brushColorInput B" ref={colorBInput}></input>
        <input className="brushWeight" ref={weightInput}></input>
        <button onClick={addButtonHandler}>Добавить</button>
        <button onClick={setHide}>Отмена</button>
    </div>
  );
}