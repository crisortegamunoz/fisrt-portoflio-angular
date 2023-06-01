import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AboutMe } from '../../model/about-me';
import { SearchResults } from '../../model/response/search-results';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  private CONTROLLER: string = '/about-me/';

  constructor(private http: HttpClient) { 

  }

  public findByPage(pageNumber: number, pageSize: number): Observable<SearchResults<AboutMe>> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-page/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public findById(id: number) {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-id/${id}`);
  }

  public save(aboutMe: AboutMe) {
    return this.http.post<AboutMe>(`${environment.PORTFOLIO_API}${this.CONTROLLER}`, aboutMe);
  }

  public update(aboutMe: AboutMe) {
    return this.http.put<AboutMe>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${aboutMe.id}`, aboutMe);
  }

  public delete(id: number) {
    return this.http.delete<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${id}`);
  }

}
