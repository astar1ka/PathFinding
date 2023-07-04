import { useRef, useState } from "react";
import { TProps } from "../../Types";
import './Settings.css'

export default function Settings({ settings, simulator }: TProps) {
    const inputPeopleDecency = useRef<HTMLInputElement>(null!);
    const inputCountPedestrians = useRef<HTMLInputElement>(null!);
    const inputCountPedestriansAtHour = useRef<HTMLInputElement>(null!);
    const inputCountPedestriansAtDay = useRef<HTMLInputElement>(null!);
    let countPedestrians = settings.getCountPedestrians()
    let paperPaths: any[] = [];
    let typeInputPedestrian = 'hour';
    let peopleDecency = settings.getPeopleDecency();
    const [open, setOpen] = useState(false);
    const openHandler = () => {
        setOpen(!open);
    }

    const runClickHandler = () => {
        settings.setLoading(true);
        paperPaths.forEach(path => path.remove());
        paperPaths = [];
        setTimeout(() => {
            simulator.run();
            const paths = simulator.getPaths();
            paths.forEach(path => {
                for (let i = 0; i < path.length - 1; i++) {
                    const paperPath = settings.getPaper().path(`M${path[i].x * 15 + 7.5} ${path[i].y * 15 + 7.5}L${path[i + 1].x * 15 + 7.5} ${path[i + 1].y * 15 + 7.5}`).attr({ 'stroke-opacity': 1 / (settings.getCountPedestrians()), stroke: 'red', 'stroke-width': 3 });
                    paperPaths.push(paperPath);
                }
            });
            settings.setLoading(false);
        })
    }

    const acceptHandler = () => {
        settings.setCountPedestrians((typeInputPedestrian === 'day') ? Math.round(countPedestrians / 24) : countPedestrians);
        settings.setPeopleDecency(peopleDecency);
    }

    const changeInputCountPedestrians = () => {
        if (Number(inputCountPedestrians.current.value) || inputCountPedestrians.current.value === '')
            countPedestrians = Number.parseInt(inputCountPedestrians.current.value) || 0;
        inputCountPedestrians.current.value = countPedestrians.toString();
    }

    const changeInputCountPedestriansType = (type: string) => {

        if (type === 'hour') {
            if (typeInputPedestrian === 'day') countPedestrians = Math.round(countPedestrians / 24);
            inputCountPedestriansAtHour.current.checked = true;
            inputCountPedestriansAtDay.current.checked = false;
            typeInputPedestrian = 'hour'
        }
        if (type === 'day') {
            if (typeInputPedestrian === 'hour') countPedestrians = Math.round(countPedestrians * 24);
            inputCountPedestriansAtDay.current.checked = true;
            inputCountPedestriansAtHour.current.checked = false;
            typeInputPedestrian = 'day'
        }
        inputCountPedestrians.current.value = countPedestrians.toString();
    }

    const changePeopleDecencyHandler = () => {
        if (!(inputPeopleDecency.current.value === '0.')) {
            const value = Number.parseFloat(inputPeopleDecency.current.value) || peopleDecency;
            if (value > 0 && value <= 0.9) peopleDecency = value;
            inputPeopleDecency.current.value = peopleDecency.toString();
        }

    }

    return (
        <div className="Settings">
            <p onClick={openHandler}>Настройки</p>
            <div className={(open) ? '' : 'hide'}>
                <div className="settingsBox --pedestrians">
                    Количество пешеходов
                    <input className="settingsInput" ref={inputCountPedestrians} defaultValue={countPedestrians} onChange={changeInputCountPedestrians} />
                    <div className='settingsCheckbox'>
                        <input type='checkbox' defaultChecked={true} ref={inputCountPedestriansAtHour} onClick={() => changeInputCountPedestriansType('hour')} />В час
                        <input type='checkbox' ref={inputCountPedestriansAtDay} onClick={() => changeInputCountPedestriansType('day')} />В сутки
                    </div>
                </div>
                <div className="settingsBox --time">
                    Время симуляции
                    <input className="settingsInput" defaultValue={settings.getTime()} />
                    <div className='settingsCheckbox'><input type='checkbox' /> Часы</div>
                    <div className='settingsCheckbox'><input type='checkbox' /> Сутки</div>
                    <div className='settingsCheckbox'><input type='checkbox' /> Месяцы</div>
                </div>
                <div className="settingsBox --cellSize">
                    Размер сетки
                    <input className="settingsInput" defaultValue={settings.getCellSize()} />
                </div>
                <div className="settingsBox --cellSize">
                    Порядочность пешеходов
                    <input className="settingsInput" ref={inputPeopleDecency} defaultValue={peopleDecency} onChange={changePeopleDecencyHandler} />
                </div>
                <button className="settingsButton" onClick={acceptHandler}>Принять</button>
            </div>
            <button className="settingsButton" onClick={runClickHandler}>Запуск</button>
            <button className="settingsButton">Отмена</button>
        </div>
    )
}