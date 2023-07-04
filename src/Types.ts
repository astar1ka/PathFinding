export interface INode {
    x: number;
    y: number;
    setView(view: any): void;
    getView(): any;
    getWeight(node: INode, pedestrian: TPedestrian): number;
    setWeight(weight: number): void;
    getAbsWeight(): number
    setCanMove(can: boolean): void;
    isCanMove(): boolean;
    getDistanceEstimateTo(node: INode): number;
    findNearNodes(nodes: INode[][]): void;
    getNearbyNodes(): INode [];
}

export interface ISimulator {
    getNodesMap(): INode [][];
    run(): void;
    addPedestrianGenerator(generator: INode): void;
    deletePedestrianGenerator(generator: INode): void;
    getPaths(): INode [][];
}

export interface ISettings {
    getPaper(): any;
    getBrushColor(): string;
    getBrushWeight():number;
    getBrushs(): TBrush [];
    addBrush(brush: TBrush): void;
    setBrush(brushNumber: number): void;
    getCellSize(): number;
    setCellSize(cellSize: number): void;
    getCountPedestrians(): number;
    setCountPedestrians(count: number): void
    setTime(time: number): void;
    getTime(): number;
    setPeopleDecency(decency: number): void;
    getPeopleDecency(): number;
    setLoading(loading: boolean): void;
    setLoadingController(controller: Function): void
}

type Props = {
    [key: string]: any
}

export type TProps = Props & {
    settings: ISettings;
    simulator: ISimulator;
}

export type TColor = {
    R: number,
    G: number,
    B: number
}

export type TBrush  = {
    name: string,
    color: TColor,
    weight: number,
    active: boolean
}

export type TVector = {
    x: number,
    y: number
}

export type TPedestrian = {
    decency: number;
}
