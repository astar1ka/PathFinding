import { useEffect, useState } from "react";
import { TProps } from "../../Types";
import './Loading.css';

export default function Loading({ settings, simulator }: TProps) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Загрузка...');
    settings.setLoadingController((loading: boolean)=> {
        if (loading == false) {
            setText('Готово!');
            setTimeout(()=>setLoading(false),1500);
        } else {
            setText('Загрузка...');
            setLoading(true);
        }
    })
    return (
        <div className={`Loading ${(loading) ? '' : 'hide'}`}>
            <div className='loadingText'>{text}</div>
        </div>
    );
}