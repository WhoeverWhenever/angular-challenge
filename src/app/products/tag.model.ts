export interface ITag {
    id: number;
    name: string;
    color: string;
}

export class Tag implements ITag {
    id: number;
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.id = Math.round(Date.now() * Math.random());
        this.name = name;
        this.color = color;
    }
}