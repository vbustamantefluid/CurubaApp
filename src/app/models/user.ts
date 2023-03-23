export class User {
    id: string;
    name: string;
    mail: string;
    password: string;
    phone: string;
    photoUrl?: string;
    address: Address;
}

export class Address {
    street: string;
    number: string;
    zipCode: string;
    state: string;
    city: string; 
}