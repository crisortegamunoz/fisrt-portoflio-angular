import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { LaboratoryService } from '../../../core/services/laboratory/laboratory.service';
import { Laboratory } from '../../../core/model/laboratory';
import { SearchResults } from '../../../core/model/response/search-results';
import { CommonUtils } from '../../../core/util/common';
import { SwalUtils } from '../../../core/util/swalfire-util';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.scss']
})
export class LaboratoryComponent implements OnInit {

  currentPage: number;
  pageSize: number;
  totalRecords: number;
  loading: boolean;
  technologyNotFound: boolean;
  asyncLaboratoryList: Observable<Laboratory[]>;
  message: string;

  constructor(private router: Router, private route: ActivatedRoute,  private laboratoryService: LaboratoryService) { 
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 6;
    this.loading = true;
    this.technologyNotFound = false;
    this.message = '';
  }

  ngOnInit() {
    const technologyName = this.route.snapshot.params.technology;
    if (technologyName) {
      this.loadLaboratoriesByTechnologyname(technologyName);
    } else {
      this.loadLaboratoriesByPage();
    }
    
  }

  pageChanged(page: number): void {
    this.loading = true;
    this.currentPage = page;
  }

  private loadLaboratoriesByTechnologyname(technologyName: string): void {
    this.asyncLaboratoryList = this.getLaboratories(technologyName).pipe(
      tap(result => {
          if (result) {
            this.technologyNotFound = false;
            this.totalRecords = result.pagination.totalRecords;
            setTimeout (() => {
              this.loading = false;
            }, 300);
          }
        },
        error => {
          const NOT_FOUND = SwalUtils.showErrorByHttpResponse(error, 'laboratorio');
          this.loading = false;
          if (NOT_FOUND) {
            this.technologyNotFound = true;
            this.message = 'No se encontraron datos.';
          }
        }),
      map(res => res.searchResults)
    );
  }

  private loadLaboratoriesByPage(): void {
    this.asyncLaboratoryList = this.getLaboratories(null).pipe(
      tap(result => {
          if (result) {
            this.technologyNotFound = false;
            this.totalRecords = result.pagination.totalRecords;
            setTimeout (() => {
              this.loading = false;
            }, 300);
          }
        },
        error => {
          const NOT_FOUND = SwalUtils.showErrorByHttpResponse(error, 'laboratorio');
          this.loading = false;
          if (NOT_FOUND) {
            this.technologyNotFound = true;
            this.message = 'No se encontraron datos.';
          }
        }),
      map(res => res.searchResults)
    );
  }

  private getLaboratories(technologyName: string): Observable<SearchResults<Laboratory>>  {
    if (CommonUtils.undefinedNullOrEmpty(technologyName)) { 
      return this.laboratoryService.findByPage(this.currentPage, this.pageSize);
    } else {
      return this.laboratoryService.findByPageAndTechnologyName(this.currentPage, this.pageSize, technologyName);
    }
    
  }


}
