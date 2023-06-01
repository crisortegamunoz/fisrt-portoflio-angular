import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';

import { Certificate } from '../../../../../core/model/certificate';
import { CertificateService } from '../../../../../core/services/certificate/certificate.service';
import { DocumentService } from '../../../../../core/services/document/document.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate-list',
  templateUrl: './certificate-list.component.html',
  styleUrls: ['./certificate-list.component.scss']
})
export class CertificateListComponent implements OnInit {

  loadingScreen: boolean;
  pageEvent: PageEvent;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  dataSource = null;

  displayedColumns: string[] = ['id', 'course', 'learningPlatform', 'category', 'approved', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private certificateService: CertificateService, private documentService: DocumentService) { 
    this.loadingScreen = true;
    this.dataSource = new MatTableDataSource<Certificate>();
    this.dataSource.paginator = this.paginator;
    this.totalRecords = 0;
    this.currentPage = 1;
    this.pageSize = 15;
  }


  ngOnInit() {
    this.findCertificateList();
  }

  findByPage(event: PageEvent): void {
    this.currentPage = this.currentPage - event.previousPageIndex + event.pageIndex;
    this.pageSize = event.pageSize;
    this.findCertificateList();
  }

  private findCertificateList(): void {
    this.certificateService.findByPage(this.currentPage, this.pageSize).pipe(take(1)).subscribe(
    response => {
      this.totalRecords = response.pagination.totalRecords;
      this.dataSource = response.searchResults;
    },
    error => {

    });
  }

  onFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCertificate(certificate: Certificate): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: 'Yes, delete it'
    }).then(result => {
      if (result.value) {
        this.certificateService.delete(certificate.id).pipe(take(1)).subscribe(
          response => {
            if (response) {
              Swal.fire('Deleted!', 'Your certificate has been deleted', 'success');
              this.findCertificateList();
            } else {
               Swal.fire('Error!', 'There was as error deleting this certificate', 'error');
            }
          },
          error => {
            console.log(error);
          });
      }
    })
  }

}
