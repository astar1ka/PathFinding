import { INode, TPedestrian } from "../Types";

export default class Node  implements INode{
    private weight: number = 1;
    private canMove: boolean = true;
    private view: any;
    private nodes: INode[] = [];
    private edges = new Map<INode, number>();
    constructor(public x: number, public y: number) {
    }

    public setView(view: any): void{
        this.view = view;
    }

    public getView(): any{
        return this.view;
    }

    public getWeight(node: INode, pedestrian: TPedestrian): number {
        const decencyCoef = (this.weight > 1) ? pedestrian.decency/(1-pedestrian.decency) : 1;
        const weight = decencyCoef * this.weight;
        return  ((weight > 1) ? weight : 1) * (this.edges.get(node) || 1);
    }

    public getAbsWeight(): number{
        return this.weight;
    }

    public setWeight(weight: number): void {
        this.weight = weight;
    }

    public setCanMove(can: boolean): void {
        this.canMove = can;
    }

    public isCanMove(): boolean {
        return this.canMove;
    }

    public getDistanceEstimateTo(node: INode): number {
        return Math.abs(this.x - node.x) + Math.abs(this.y - node.y);
    }

    public findNearNodes(nodes: INode[][]): void {
        if (this.x > 0) {
            const nodeW = nodes[this.x - 1][this.y]
            this.nodes.push(nodeW);
            this.edges.set(nodeW, 1);
            if (this.y > 0) {
                const nodeNW = nodes[this.x - 1][this.y - 1]
                this.nodes.push(nodeNW);
                this.edges.set(nodeNW, 1.4);
            }
        }
        if (this.x < nodes.length-2) {
            const nodeE = nodes[this.x + 1][this.y]
            this.nodes.push(nodeE);
            this.edges.set(nodeE, 1);
            if (this.y < nodes.length-2) {
                const nodeSE = nodes[this.x + 1][this.y + 1];
                this.nodes.push(nodeSE);
                this.edges.set(nodeSE, 1.4);
            };
        }
        if (this.y > 0) {
            const nodeN = nodes[this.x][this.y - 1];
            this.nodes.push(nodeN);
            this.edges.set(nodeN, 1);
            if (this.x < nodes.length-2) {
                const nodeNE = nodes[this.x + 1][this.y - 1];
                this.nodes.push(nodeNE);
                this.edges.set(nodeNE, 1.4);
            }

        };
        if (this.y < nodes.length-2) {
            this.nodes.push(nodes[this.x][this.y + 1])
            if (this.x > 0) this.nodes.push(nodes[this.x - 1][this.y + 1]);
        };
    }

    public getNearbyNodes(): INode []{
        return this.nodes;
    }

}