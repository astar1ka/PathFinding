import { INode, ISimulator, TPedestrian } from "../../Types"
import Node from "../Node";
import PathFinder from "../PathFinder";
import SettingsData from "../SettingsData";

function createNodesMap(width: number, height: number): INode[][] {
    const nodesMap: Node[][] = [];
    for (let i = 0; i < width; i++) {
        nodesMap.push([]);
        for (let j = 0; j < height; j++) nodesMap[i][j] = new Node(i, j);
    }
    nodesMap.forEach(row => row.forEach(node => node.findNearNodes(nodesMap)));
    return nodesMap;
}


export default class Simulator implements ISimulator {
    private progress = 0;
    private nodesMap: INode[][] = [];
    private pedestrians: TPedestrian[] = [];
    private paths: INode[][] = [];
    private pedestriansGenerators: INode[] = [
    ];

    constructor(private settings: SettingsData) {
        const width = Math.round(window.innerWidth / settings.getCellSize()) + 1;
        const height = Math.round(window.innerHeight / settings.getCellSize()) + 1;
        this.nodesMap = createNodesMap(width, height);
    }

    private createPedestrian(): TPedestrian {
        const middle = this.pedestrians.reduce((s, pedestrian) => s + pedestrian.decency, 0) / this.pedestrians.length;
        const needMiddle = this.settings.getPeopleDecency();
        let decency = Math.random();
        if (middle < needMiddle) while (decency < needMiddle) decency = Math.random();
        else while (decency > needMiddle) decency = Math.random();
        return {
            decency
        }
    }


    private getStartPoint(): INode {
        let randomIndex = Math.round(Math.random() * (this.pedestriansGenerators.length - 1));
        return this.pedestriansGenerators[randomIndex];
    };

    private getEndPoint(startPoint: INode): INode {
        let randomIndex = Math.round(Math.random() * (this.pedestriansGenerators.length - 1));
        while (this.pedestriansGenerators[randomIndex] === startPoint)
            randomIndex = Math.round(Math.random() * (this.pedestriansGenerators.length - 1));
        return this.pedestriansGenerators[randomIndex];
    }

    public getNodesMap(): INode[][] {
        return this.nodesMap;
    }

    public run(): void {
        this.paths = [];
        if (this.pedestriansGenerators.length > 1) {
            const countPedestrians = this.settings.getCountPedestrians();
            for (let i = 0; i < countPedestrians; i++) {
                this.pedestrians[i] = this.createPedestrian();
            };
            const iteration = this.settings.getTime();
            for (let i = 0; i < iteration; i++) {
                this.pedestrians.forEach(
                    (pedestrian: TPedestrian) => {
                        const start = this.getStartPoint();
                        const finish = this.getEndPoint(start);
                        this.paths.push(PathFinder(start, finish, pedestrian));
                    }
                )
            }
        }
    }

    public getPaths(): INode[][] {
        return this.paths;
    }

    public addPedestrianGenerator(generator: INode): void {
        if (!this.pedestriansGenerators.find(node => node === generator)) this.pedestriansGenerators.push(generator);
    }

    public deletePedestrianGenerator(generator: INode): void {
        this.pedestriansGenerators = this.pedestriansGenerators.filter(node => node !== generator);
    }
}