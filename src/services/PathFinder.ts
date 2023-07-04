import { INode, TPedestrian, TVector } from "../Types";

function del(arr: any [], delEl: any){
    return arr.filter(el => el != delEl);
}

function heuristic(a:INode, b: INode){
    return Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
}

function getVector(node: INode, finish: INode){
    return {x: finish.x-node.x, y: finish.y-node.y} as TVector;
}

function getLength(vector: TVector){
    return Math.sqrt(vector.x*vector.x+vector.y*vector.y);
}

function getCos(a:TVector, b: TVector){
    return (a.x*b.x+a.y*b.y)/(getLength(a)*getLength(b));
}

export default function PathFinder(start: INode, finish: INode, pedestrian: TPedestrian){
    let unexplored: INode[] = [start];
    const cameFrom = new Map<INode,INode | null>();
    const nodeCosts = new Map<INode, number>();
    let pathCost = 0;
    
    cameFrom.set(start,null);

    while (unexplored[0] && unexplored[0] != finish){
        let current = unexplored[0];
        pathCost = nodeCosts.get(current) || 0;
        current.getNearbyNodes().forEach((next: INode) => {
            if(next.isCanMove()){
                let newCost = pathCost 
                    + (2-getCos(getVector(current,next),getVector(next,finish)))
                    * next.getWeight(current,pedestrian);
                let prevCost = nodeCosts.get(next);
                if (!prevCost || prevCost > newCost) {
                    unexplored.push(next);
                    cameFrom.set(next, current);
                    nodeCosts.set(next, newCost);
                }
            }
        });
        unexplored = del(unexplored,current);
        unexplored.sort((a,b)=>{
            let costA = heuristic(a,finish) * (nodeCosts.get(a) || 0);
            let costB = heuristic(b,finish) * (nodeCosts.get(b) || 0);
            if ( costA > costB) return 1
            if (costA < costB) return -1;
            return 0;
        })
    }

    let path: INode [] = [finish];
    let pathCurrent = finish;
    
    while (cameFrom.get(pathCurrent)!=start){
        let prev = cameFrom.get(pathCurrent);
        if (prev) {
            pathCurrent = prev;
            path.push(prev);
        }
    }
    path.push(start);

    return path;
}