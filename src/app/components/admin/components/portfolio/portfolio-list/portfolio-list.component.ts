import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

import { Project } from '../../../../../core/model/project';
import { PortfolioService } from '../../../../../core/services/portfolio/portfolio.service';
import { DocumentService } from '../../../../../core/services/document/document.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss']
})
export class PortfolioListComponent implements OnInit {

  loadingScreen: boolean;
  pageEvent: PageEvent;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  dataSource = null;

  displayedColumns: string[] = ['id', 'important', 'projectName', 'businessCategory', 'role', 'descriptionOne', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private portfolioService: PortfolioService, private documentService: DocumentService) { 
    this.loadingScreen = true;
    this.dataSource = new MatTableDataSource<Project>();
    this.dataSource.paginator = this.paginator;
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 15;
  }

  ngOnInit() {
    this.findProjectList();
  }

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findByPage(event:PageEvent): void {
    this.currentPage = this.currentPage - event.previousPageIndex + event.pageIndex;
    this.pageSize = event.pageSize;
    this.findProjectList();
  }

  deleteProject(project: Project) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Yes, delete it'
    }).then(result => {
      if (result.value) {
        this.portfolioService.delete(project.id).pipe(take(1)).subscribe(
          response => {
            if (response) {
              this.documentService.deleteFileStorage(project.fileRef, 'Project');
              Swal.fire('Deleted!', 'Your project has been deleted', 'success');
              this.findProjectList();
            } else {
              Swal.fire('Error!', 'There was an error deleting this project', 'error');
            }
          },
          error => {
            console.log(error);
          });
      }
    })
  }

  private findProjectList(): void {
    this.portfolioService.findByPage(this.currentPage, this.pageSize).pipe(take(1)).subscribe(
    response => {
      this.totalRecords = response.pagination.totalRecords;
      this.dataSource = response.searchResults;
    },
    error => {
      console.log(error);
    });
  }

}
