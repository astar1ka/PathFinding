import './Brush.css'


type Props = {
    [key: string]: any
}

export default function Brush({onClick,brush}: Props) {
    const style = {
        backgroundColor: `rgb(${brush.color.R},${brush.color.G},${brush.color.B})`,
        height: '15px',
        width: '15px',
        border: (brush.active) ? 'solid 2px white' : ''
    }
    return (
    <div className='Brush' onClick={onClick}>
        <div className='colorBox' style={style}></div>
        <div className='brushName'>{brush.name}</div>
    </div>)
}