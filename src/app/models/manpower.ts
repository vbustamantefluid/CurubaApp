export class Manpower {
    id: string;
    calibers: Caliber[];
}

export class Caliber {
    caliber: number;
    typeJuice: TypeJuices[]
}

export class TypeJuices {
    typeJuice: string;
    cost: number;
}