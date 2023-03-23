export class Prices {
    id: string;
    calibers: Caliber[];
}

export class Caliber {
    caliber: number;
    types: TypesJuCli[]
}

export class TypesJuCli {
    typeJuice: string;
    typeClient: string;
    price: number;
}
 