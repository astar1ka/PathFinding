import { ISettings, TBrush } from "../Types";

const BasicBrushes = [
    {
        name: 'Генератор',
        color: { R: 255, G: 100, B: 0 },
        weight: -1,
        active: true
    },
    {
        name: 'Стена',
        color: { R: 20, G: 20, B: 20 },
        weight: 10000,
        active: false
    },
    {
        name: 'Дорога',
        color: { R: 255, G: 255, B: 122 },
        weight: 1,
        active: false
    },
    {
        name: 'Газон',
        color: { R: 50, G: 200, B: 50 },
        weight: 2,
        active: false
    },
    {
        name: 'Насаждения',
        color: { R: 1, G: 63, B: 40 },
        weight: 15,
        active: false
    },
    {
        name: 'Клумба',
        color: { R: 255, G: 102, B: 129 },
        weight: 6,
        active: false
    }
];

export default class SettingsData implements ISettings{
    private cellSize: number = 15;
    private brushes: TBrush[];
    private activeBrush: TBrush;
    private countPedestrians: number = 10;
    private time:number = 48;
    private paper: any;
    private peopleDecency: number = 0.7;
    private loadingController: Function = () => {};
    constructor() {
        let paper = require('raphael');
        this.paper = paper(0, 0, '100vw', '100vh');
        this.brushes = BasicBrushes;
        this.activeBrush = this.brushes[0];
    }

    public getPaper(): any {
        return this.paper;
    }

    public getBrushColor(): string {
        const brush = this.activeBrush;
        return `rgb(${brush.color.R},${brush.color.G},${brush.color.B})`;
    }

    public getBrushWeight():number {
        return this.activeBrush.weight;
    }

    public getBrushs(): TBrush [] {
        return this.brushes.map(brush => brush);
    }

    public addBrush(brush: TBrush): void {
        this.brushes.push(brush);
    }

    public setBrush(brushNumber: number): void {
        this.activeBrush.active = false;
        this.activeBrush = this.brushes[brushNumber];
        this.activeBrush.active = true;
    }

    public getCellSize(): number {
        return this.cellSize;
    }

    public setCellSize(cellSize: number): void {
        this.cellSize = cellSize;
    }

    public getCountPedestrians(): number{
        return this.countPedestrians;
    }

    public setCountPedestrians(count: number): void{
        this.countPedestrians = Math.round(count);
    }

    public setTime(time: number):void{
        this.time = time;
    }

    public getTime(): number{
        return this.time;
    }

    public getPeopleDecency(): number{
        return this.peopleDecency;
    }

    public setPeopleDecency(decency: number): void{
        this.peopleDecency = decency;
    }

    public setLoadingController(controller: Function): void {
        this.loadingController = controller;
    }

    public setLoading(loading: boolean): void{
        this.loadingController(loading);
    }
}