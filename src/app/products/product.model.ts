import { ITag } from "./tag.model";

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    tags: ITag[];
    brand: string;
    countryOfManufacturer: string;
}

export class Product implements IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    tags: ITag[];
    brand: string;
    countryOfManufacturer: string;

    constructor(name: string, description: string, price: number, tags: ITag[] = [], brand: string, countryOfManufacturer: string) {
        this.id = Math.round(Date.now() * Math.random());
        this.name = name;
        this.description = description;
        this.price = Number(price.toFixed(2));
        this.tags = tags;
        this.brand = brand;
        this.countryOfManufacturer = countryOfManufacturer;
    }
}