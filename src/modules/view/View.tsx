import './View.css';
import { INode, ISettings, ISimulator, TProps } from '../../Types';

var paper = require('raphael');

function drawNodeCell(settings: ISettings, simulator: ISimulator, node: INode){
    const cellSize = settings.getCellSize();

    const cell = settings.getPaper().rect(cellSize * node.x, cellSize * node.y, cellSize, cellSize)
                .attr({ fill: 'rgb(255,255,255)', 'fill-opacity': 0.7, 'stroke-opacity': 0.7 })
                .mousemove(function (event: MouseEvent) {
                    if (event.buttons == 1) {
                        const brushWeight = settings.getBrushWeight();
                        const node = cell.data('node');
                        cell.attr({ fill: settings.getBrushColor() });
                        node.setWeight(brushWeight);
                        if (brushWeight > 99999) node.setCanMove(false);
                        if (brushWeight < 0) {
                            simulator.addPedestrianGenerator(node);
                            node.setWeight(1);
                        }
                    }
                });
    return cell;
}

export default function View({ settings, simulator }: TProps) {
    const nodesMap = simulator.getNodesMap();

    

    nodesMap.forEach(row =>
        row.forEach(node => {
            const cell = drawNodeCell(settings,simulator, node);
            node.setView(cell);
            cell.data('node', node);
        })
    );

    
    return (
        <div className="View">
        </div>
    );
}