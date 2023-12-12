import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.dev";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatedEntityDto} from "../../shared/dtos/created-entity-dto";
import {Customer} from "src/app/features/models/customer";
import { CreateCustomerDto } from 'src/app/shared/dtos/create-customer-dto'; 
import { Guid } from 'guid-typescript';

@Injectable({
    providedIn: 'any'
})
export class CustomerService {
    constructor(private httpClient: HttpClient){ }

    private path: string = `${environment.apiUrl}Customer`;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    getCustomers() : Observable<Customer[]> {
        return this.httpClient.get<Customer[]>(`${this.path}/GetAll`);
    }

    addCustomer(createCustomerRequest: CreateCustomerDto) {
        return this.httpClient.post<CreatedEntityDto>(`${this.path}`, createCustomerRequest);
    }

    editCustomer(customerToEdit: Customer) {
        return this.httpClient.put<CreatedEntityDto>(`${this.path}`, customerToEdit, this.httpOptions);
    }

    deleteCustomer(customer: Customer) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: customer
        };
        return this.httpClient.delete(`${this.path}`, options);
    }
}