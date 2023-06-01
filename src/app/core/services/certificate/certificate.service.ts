import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Certificate } from '../../model/certificate';
import { SearchResults } from '../../model/response/search-results';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private CONTROLLER: string = '/certificate/';

  constructor(private http: HttpClient) { 
    
  }

  public findByPage(pageNumber: number, pageSize: number): Observable<SearchResults<Certificate>> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-page/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  public findById(id: number): Observable<Certificate> {
    return this.http.get<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}find-by-id/${id}`);
  }

  public save(certificate: Certificate) {
    return this.http.post<Certificate>(`${environment.PORTFOLIO_API}${this.CONTROLLER}`, certificate);
  }

  public update(certificate: Certificate) {
    return this.http.put<Certificate>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${certificate.id}`, certificate);
  }

  public delete(id: number) {
    return this.http.delete<any>(`${environment.PORTFOLIO_API}${this.CONTROLLER}${id}`);
  }

}
