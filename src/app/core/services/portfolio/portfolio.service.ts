import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Project } from '../../model/project';
import { SearchResults } from '../../model/response/search-results';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private CONTROLLER: string = '/project/';

  constructor(private http: HttpClient) { 

  }

  public findByPage(pageNumber: number, pageSize: number): Observable<SearchResults<Project>> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-page/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  
  public findByPageAndTechnologyName(pageNumber: number, pageSize: number, technologyName: string): Observable<SearchResults<Project>> {
    const params = `pageNumber=${pageNumber}&pageSize=${pageSize}&name=${technologyName}`
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}filter-by-technology/?${params}`);
  }

  public findById(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-id/${id}`);
  }

  public save(project: Project) {
    return this.http.post<Project>(`${environment.PORTFOLIO_API}${this.CONTROLLER}`, project);
  }

  public update(project: Project) {
    return this.http.put<Project>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${project.id}`, project);
  }

  public delete(id: number) {
    return this.http.delete<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${id}`);
  }

  public getImportant(): Observable<Project[]> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}get-important`);
  }

}
