import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Laboratory } from '../../model/laboratory';
import { SearchResults } from '../../model/response/search-results';

@Injectable({
  providedIn: 'root'
})
export class LaboratoryService {

  private CONTROLLER: string = '/laboratory/';

  constructor(private http: HttpClient) { 

  }

  public findById(id: number): Observable<Laboratory> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-id/${id}`);
  }

  public save(laboratory: Laboratory) {
    return this.http.post<Laboratory>(`${environment.PORTFOLIO_API}${this.CONTROLLER}`, laboratory);
  }

  public update(laboratory: Laboratory) {
    return this.http.put<Laboratory>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${laboratory.id}`, laboratory);
  }

  public delete(id: number) {
    return this.http.delete<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${id}`);
  }

  public findByPage(pageNumber: number, pageSize: number): Observable<SearchResults<Laboratory>> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-page/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public findByPageAndTechnologyName(pageNumber: number, pageSize: number, technologyName: string): Observable<SearchResults<Laboratory>> {
    const params = `pageNumber=${pageNumber}&pageSize=${pageSize}&name=${technologyName}`
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}filter-by-technology/?${params}`);
  }

}
