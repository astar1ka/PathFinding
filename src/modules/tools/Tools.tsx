import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import './Tools.css';
import { TBrush, TProps } from '../../Types';
import AddBrushMenu from './AddBrushMenu/AddBrushMenu';
import Brush from './Brush/Brush';

export default function Tools({ settings, simulator }: TProps) {
  const [hideAddBrushMenu, setHideAddBrushMenu] = useState(true);
  const [brushs, updateBrushs] = useState(settings.getBrushs() as TBrush[]);

  const tools = useRef<HTMLDivElement>(null!);

  let dragging = false;
  let startX: number;
  let startY: number;
  useEffect(() => {
    tools.current.style.setProperty("--x", `${5}px`);
    tools.current.style.setProperty("--y", `${250}px`);
  }, [])

  const newBrush = {
    color: { R: 255, G: 255, B: 255 },
    name: 'Добавить'
  }

  const addBrushHandlet = () => {
    setHideAddBrushMenu(!hideAddBrushMenu);
  }

  const selectBrushHandler = (brushNumber: number) => {
    settings.setBrush(brushNumber);
    updateBrushs(settings.getBrushs());
  }

  const mouseDownHandler = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    dragging = true;
    const translateX = parseInt(tools.current.style.getPropertyValue('--x'));
    const translateY = parseInt(tools.current.style.getPropertyValue('--y'));
    startX = e.nativeEvent.pageX - translateX;
    startY = e.nativeEvent.pageY - translateY;
  }

  const mouseUpHandler = () => {
    dragging = false;
  }

  const mouseMoveHandler = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging) {
      tools.current.style.setProperty("--x", `${e.nativeEvent.pageX - startX}px`)
      tools.current.style.setProperty("--y", `${e.nativeEvent.pageY - startY}px`)
    }
  }

  const mouseLeaveHandler = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
    if (dragging) {
      tools.current.style.setProperty("--x", `${e.nativeEvent.pageX - startX}px`)
      tools.current.style.setProperty("--y", `${e.nativeEvent.pageY - startY}px`)
      dragging = false;
    }
  }

  return (
    <div className="Tools" ref={tools} onMouseDown={mouseDownHandler} onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler} onMouseLeave={mouseLeaveHandler}>
      {brushs.map((brush, index) => (<Brush key={index} onClick={() => selectBrushHandler(index)} brush={brush} />))}
      <Brush onClick={addBrushHandlet} brush={newBrush} />
      <AddBrushMenu hide={hideAddBrushMenu} setHide={() => setHideAddBrushMenu(!hideAddBrushMenu)} addBrush={(brush: TBrush) => { settings.addBrush(brush); updateBrushs(settings.getBrushs()) }} />    </div>
  );
}