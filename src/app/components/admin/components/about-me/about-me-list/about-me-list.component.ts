import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

import { AboutMe } from '../../../../../core/model/about-me';
import { AboutMeService } from '../../../../../core/services/about-me/about-me.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-me-list',
  templateUrl: './about-me-list.component.html',
  styleUrls: ['./about-me-list.component.scss']
})
export class AboutMeListComponent implements OnInit {

  loadingScreen: boolean;
  pageEvent: PageEvent;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  dataSource = null;

  displayedColumns: string[] = ['id', 'descriptionTitle', 'descriptionOne', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private aboutMeService: AboutMeService) { 
    this.loadingScreen = true;
    this.dataSource = new MatTableDataSource<AboutMe>();
    this.dataSource.paginator = this.paginator;
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 15;
  }

  ngOnInit() {
    this.findAboutMeList();
  }

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findByPage(event:PageEvent): void {
    this.currentPage = this.currentPage - event.previousPageIndex + event.pageIndex;
    this.pageSize = event.pageSize;
    this.findAboutMeList();
  }

  deleteInformation(aboutme: AboutMe) {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Yes, delete it'
    }).then(result => {
      if (result.value) {
        this.aboutMeService.delete(aboutme.id).pipe(take(1)).subscribe(
          response => {
            if (response) {
              Swal.fire('Deleted!', 'Your information has been deleted', 'success');
              this.findAboutMeList();
            } else {
               Swal.fire('Error!', 'There was as error deleting this information', 'error');
            }
          },
          error => {
            console.log(error);
          });
      }
    })
  }

  private findAboutMeList(): void {
    this.aboutMeService.findByPage(this.currentPage, this.pageSize).pipe(take(1)).subscribe(
    response => {
      this.totalRecords = response.pagination.totalRecords;
      this.dataSource = response.searchResults;
    },
    error => {
      console.log(error);
    });
  }

}
