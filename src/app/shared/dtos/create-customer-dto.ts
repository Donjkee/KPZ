export class CreateCustomerDto {
    constructor(
        public id: string = "5069a263-b631-47a1-8064-59891a72c302",
        public name: string = "",
        public address: string = "",
        public phone?: string,
        public email?: string,
    ) {}
}