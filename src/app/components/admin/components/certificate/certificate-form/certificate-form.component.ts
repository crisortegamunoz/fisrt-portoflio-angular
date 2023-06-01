import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

import { Certificate } from '../../../../../core/model/certificate';
import { CertificateService } from '../../../../../core/services/certificate/certificate.service';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss']
})
export class CertificateFormComponent implements OnInit {
  
  categories: string[];
  educationalEntities: string[];
  certificateForm: FormGroup;
  id: number;
  loading: boolean;

  private image: any;
  private fileRef: string;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
              private certificateService: CertificateService, private angularStorage: AngularFireStorage) { 
    this.id = null;
    this.loading = false;
    this.loadEducationalEntities();
    this.loadCategories();
    this.buildForm();
  }

  ngOnInit() {
    this.getParam();
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  saveCertificateProccess(event: Event): void {
    event.preventDefault();
    if (this.certificateForm.valid) {
      this.loading = true; 
      const certificate: Certificate = this.certificateForm.value;
      this.uploadImage({ ...certificate, id: this.id}, this.image);
    }
  }

  private uploadImage(certificate: Certificate, image: File) {
    this.filePath = `images/certificate/${image.name}`;
    const fileRef = this.angularStorage.ref(this.filePath);
    const task = this.angularStorage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.finalizeProccess(certificate);
          });
        })
      ).subscribe();
  }

  private buildForm(): void {
    this.certificateForm = this.formBuilder.group({
      id: [null],
      course: ['', [Validators.required]],
      code: ['', [Validators.required]],
      category: ['', [Validators.required]],
      learningPlatform: ['', [Validators.required]],
      approved: [null, [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  private loadEducationalEntities(): void {
    const educationalEntities = ['Platzi', 'Escalab', 'Udemy'];
    this.educationalEntities = educationalEntities.sort();
  }

  private loadCategories(): void {
    const categoryList = ['Versionamiento', 'Java', 'JavaScript', 'Angular', 'NodeJS', 'TypeScript', 'Frontend']
    this.categories = categoryList.sort();
  }

  private getParam(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
          this.getCertificateById(this.id);
        }
    });
  }

  private finalizeProccess(certificate: Certificate) {
    const certificateObj = { ...certificate, image: this.downloadURL, fileRef: this.filePath};
    if (certificateObj.id) {
      this.updateCertificate(certificateObj);
    } else {
      this.saveCertificate(certificateObj);
    }
  }

  private saveCertificate(certificate: Certificate) {
    this.certificateService.save(certificate).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/course']);
        SwalUtils.showCreationMessage('certificate');
      },
      error => {
        this.loading = false;
        SwalUtils.showErrorByHttpResponse(error, 'There was as error creating this certificate, please try later.');
      }
    );
  }

  private updateCertificate(certificate: Certificate) {
    this.certificateService.update(certificate).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/course']);
        SwalUtils.showUpdatedMessage('certificate');
      },
      error => {
        this.loading = false;
        SwalUtils.showErrorByHttpResponse(error, 'There was as error updating this certificate, please try later.');
      }
    );
  }

  private getCertificateById(id: number) {
    this.certificateService.findById(id).pipe(take(1)).subscribe(
      resp => {
        this.fileRef = resp.fileRef;
        const certificate: Certificate = { ...resp, id: id, fileRef: null};
        this.certificateForm.patchValue(certificate);
      },
      error => {
        console.log(error);
      }
    );
  }

}
