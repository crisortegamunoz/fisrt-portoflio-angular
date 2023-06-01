import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PortfolioService } from '../../../core/services/portfolio/portfolio.service';
import { Project } from '../../../core/model/project';
import { SearchResults } from '../../../core/model/response/search-results';
import { CommonUtils } from '../../../core/util/common';
import { SwalUtils } from '../../../core/util/swalfire-util';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  currentPage: number;
  pageSize: number;
  totalRecords: number;
  loading: boolean;
  technologyNotFound: boolean;
  asyncPortfolioList: Observable<Project[]>;
  message: string;

  constructor(private router: Router, private route: ActivatedRoute,  private portfolioService: PortfolioService) { 
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
      this.findPortfolioByTechnologyname(technologyName);
    } else {
      this.loadPortfolioByPages();
    }
    
  }

  pageChanged(page: number): void {
    this.loading = true;
    this.currentPage = page;
    this.loadPortfolioByPages();
  }

  private findPortfolioByTechnologyname(technologyName: string): void {
    this.asyncPortfolioList = this.getPortfolios(technologyName).pipe(
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
        const NOT_FOUND = SwalUtils.showErrorByHttpResponse(error, 'proyecto');
        this.loading = false;
          if (NOT_FOUND) {
            this.technologyNotFound = true;
            this.message = 'No se encontraron datos para la tecnología que buscas.';
          }
      }),
      map(res => res.searchResults)
    );
  }

  private loadPortfolioByPages(): void {
    this.asyncPortfolioList = this.getPortfolios(null).pipe(
      tap(
        result => {
          if (result) {
            this.technologyNotFound = false;
            this.totalRecords = result.pagination.totalRecords;
            setTimeout (() => {
              this.loading = false;
            }, 300);
          }
          
        },
        error => {
          const NOT_FOUND = SwalUtils.showErrorByHttpResponse(error, 'proyecto');
          this.loading = false;
          if (NOT_FOUND) {
            this.technologyNotFound = true;
            this.message = 'No se encontraron datos.';
          }
        }),
      map(res => res.searchResults)
    );
  }

  private getPortfolios(technologyName: string): Observable<SearchResults<Project>>  {
    if (CommonUtils.undefinedNullOrEmpty(technologyName)) {
      return this.portfolioService.findByPage(this.currentPage, this.pageSize);
    } else {
      return this.portfolioService.findByPageAndTechnologyName(this.currentPage, this.pageSize, technologyName);
    }
    
  }

}
