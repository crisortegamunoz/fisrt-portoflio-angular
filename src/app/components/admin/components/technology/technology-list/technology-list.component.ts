import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

import { Technology } from '../../../../../core/model/technology';
import { TechnologyService } from '../../../../../core/services/technology/technology.service';
import { DocumentService } from '../../../../../core/services/document/document.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.scss']
})
export class TechnologyListComponent implements OnInit {

  loadingScreen: boolean;
  pageEvent: PageEvent;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  dataSource = null;

  displayedColumns: string[] = ['id', 'category', 'technologyName', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private technologyService: TechnologyService, private documentService: DocumentService) { 
    this.loadingScreen = true;
    this.dataSource = new MatTableDataSource<Technology>();
    this.dataSource.paginator = this.paginator;
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 15;
  }

  ngOnInit() {
    this.findTechnologyList();
  }

  findByPage(event:PageEvent): void {
    this.currentPage = this.currentPage - event.previousPageIndex + event.pageIndex;
    this.pageSize = event.pageSize;
    this.findTechnologyList();
  }

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTechnology(technology: Technology): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Yes, delete it'
    }).then(result => {
      if (result.value) {
        this.technologyService.delete(technology.id).pipe(take(1)).subscribe(
          response => {
            if (response) {
              this.documentService.deleteFileStorage(technology.fileRef, 'Technology');
              Swal.fire('Deleted!', 'Your technology has been deleted', 'success');
              this.findTechnologyList();
            } else {
              Swal.fire('Error!', 'There was an error deleting this technology', 'error');
            }
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  private findTechnologyList(): void {
    this.technologyService.findByPage(this.currentPage, this.pageSize).pipe(take(1)).subscribe(
    response => {
      this.totalRecords = response.pagination.totalRecords;
      this.dataSource = response.searchResults;
    },
    error => {
      console.log(error);
    });
  }

}
