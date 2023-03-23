export class ProdDay{
    id: string;
    date: Date;
    status: string;
    production: string[];
    delivery: string[];
    clientOrders: ClientOrder[];
}

export class ClientOrder{
    client: string;
    dateDelivery: Date;
    calibers: Caliber[];
}

export class Caliber{
    caliber: number;
    ordered: Juice[];
    produced: Juice[];
}

export class Juice{
    juice: string;
    typeJuice: string;
    amount: number;
}