import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

import { Laboratory } from '../../../../../core/model/laboratory';
import { LaboratoryService } from '../../../../../core/services/laboratory/laboratory.service';
import { DocumentService } from '../../../../../core/services/document/document.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lab-list',
  templateUrl: './lab-list.component.html',
  styleUrls: ['./lab-list.component.scss']
})
export class LabListComponent implements OnInit {

  loadingScreen: boolean;
  pageEvent: PageEvent;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  dataSource = null;

  displayedColumns: string[] = ['id', 'projectName', 'description', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private laboratoryService: LaboratoryService, private documentService: DocumentService) { 
    this.loadingScreen = true;
    this.dataSource = new MatTableDataSource<Laboratory>();
    this.dataSource.paginator = this.paginator;
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 15;
  }

  ngOnInit() {
    this.findProjectList();
  }

  findByPage(event:PageEvent): void {
    this.currentPage = this.currentPage - event.previousPageIndex + event.pageIndex;
    this.pageSize = event.pageSize;
    this.findProjectList();
  }

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProject(project: Laboratory) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Yes, delete it'
    }).then(result => {
      if (result.value) {
        this.laboratoryService.delete(project.id).pipe(take(1)).subscribe(
          response => {
            if (response) {
              this.documentService.deleteFileStorage(project.fileRef, 'Laboratory');
              Swal.fire('Deleted!', 'Your laboratory project has been deleted', 'success');
              this.findProjectList();
            } else {
              Swal.fire('Error!', 'There was an error deleting this laboratory project', 'error');
            }
          },
          error => {
            console.log(error);
          });
      }
    })
  }

  private findProjectList(): void {
    this.laboratoryService.findByPage(this.currentPage, this.pageSize).pipe(take(1)).subscribe(
    response => {
      this.totalRecords = response.pagination.totalRecords;
      this.dataSource = response.searchResults;
    },
    error => {
      console.log(error);
    });
  }

}
