
export class Dealership {
    id: string = "";
    name: string = "";
    address: string = "";
    phone: string = "";

    constructor(dealershipId: string, name: string, address: string, phone: string) {
        this.id = dealershipId;
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}