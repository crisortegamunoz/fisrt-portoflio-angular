import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Technology } from '../../model/Technology';
import { SearchResults } from '../../model/response/search-results';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private CONTROLLER: string = '/technology/';

  constructor(private http: HttpClient) { 

  }

  public findByPage(pageNumber: number, pageSize: number): Observable<SearchResults<Technology>> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-page/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public findById(id: number): Observable<Technology> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-id/${id}`);
  }

  public save(technology: Technology) {
    return this.http.post<Technology>(`${environment.PORTFOLIO_API}${this.CONTROLLER}`, technology);
  }

  public update(technology: Technology) {
    return this.http.put<Technology>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${technology.id}`, technology);
  }

  public delete(id: number) {
    return this.http.delete<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${id}`);
  }

  public getImportant(): Observable<Technology[]> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}get-important`);
  }

  public getAll(): Observable<Technology[]> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}all`);
  }

}
