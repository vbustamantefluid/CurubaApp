export class Ingredient{
    id: string;
    updated: string;
    name: string;
    type: string;
    yield: number;   // en Litros por kg.
    cost: number;
    kgs: number;     // kgs por pack.
    hay: number;
    inactive: boolean;
}