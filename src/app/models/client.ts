export class Client {
    id: string;
    name: string;
    type: string;
    active: boolean;
    iva: boolean;
    caliber: number[];
    typeJuices: string[];
    seals: boolean;
    contactInfo: ContactInfo;
}

export class ContactInfo {
    address: string;
    phone: string;
    mail: string;
    contact: string;
    zone: string;
    cuit: number;
}

