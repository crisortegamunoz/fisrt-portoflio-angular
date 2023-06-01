import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SearchResults } from '../../../core/model/response/search-results';
import { CertificateService } from '../../../core/services/certificate/certificate.service';
import { Certificate } from '../../../core/model/certificate';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit  {

  currentPage: number;
  pageSize: number;
  totalRecords: number;
  loading: boolean;
  asyncCertificateList: Observable<Certificate[]>;

  constructor(private certificateService: CertificateService) { 
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 6;
    this.loading = true;
  }

  ngOnInit() {
    this.loadCertificateByPages();
  }

  pageChanged(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.loadCertificateByPages();
  }

  private loadCertificateByPages(): void {
    this.asyncCertificateList = this.getCertificates().pipe(
      tap(result => {
        this.totalRecords = result.pagination.totalRecords;
        setTimeout (() => {
          this.loading = false;
       }, 300);
      }),
      map(res => res.searchResults)
    );
  }

  private getCertificates(): Observable<SearchResults<Certificate>> {
    return this.certificateService.findByPage( this.currentPage, this.pageSize);
  }

}
