export class Standard {
    id: string;
    type: string;
    name: string;
    code: string;
    color: string;
    ingredients: Ingred[];
    active: boolean;
}

export class Ingred {
    name: string;
    grsL: number;
} 