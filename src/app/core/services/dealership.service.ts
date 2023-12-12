import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.dev";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatedEntityDto} from "../../shared/dtos/created-entity-dto";
import { Dealership } from '../../features/models/dealership';
import { CreateDealershipDto } from 'src/app/shared/dtos/create-dealership-dto';

@Injectable({
    providedIn: 'any'
})
export class DealershipService {
    constructor(private httpClient: HttpClient){ }

    private path: string = `${environment.apiUrl}Dealership`;
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    getDealerships() : Observable<Dealership[]> {
        return this.httpClient.get<Dealership[]>(`${this.path}/GetAll`);
    }

    addDealership(createDealershipRequest: CreateDealershipDto) {
        return this.httpClient.post<CreatedEntityDto>(`${this.path}`, createDealershipRequest);
    }

    editDealership(DealershipToEdit: Dealership) {
        return this.httpClient.put<CreatedEntityDto>(`${this.path}`, DealershipToEdit, this.httpOptions);
    }

    deleteDealership(DealershipToDelete: Dealership) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: DealershipToDelete
        };
        return this.httpClient.delete(`${this.path}`, options);
    }
}