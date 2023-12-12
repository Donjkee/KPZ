
export class Customer {
    id: string = "";
    name: string = "";
    address: string = "";
    email?: string
    phone?: string

    constructor(customerId: string, name: string, address: string, email: string, phone: string) {
        this.id = customerId;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }
}