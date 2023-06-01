import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

import { Display } from '../../../../../core/model/display';
import { Technology } from '../../../../../core/model/technology';
import { TechnologyService } from '../../../../../core/services/technology/technology.service';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

@Component({
  selector: 'app-technology-form',
  templateUrl: './technology-form.component.html',
  styleUrls: ['./technology-form.component.scss']
})
export class TechnologyFormComponent implements OnInit {

  importantOption: Display[];
  categories: string[];
  technologyForm: FormGroup;
  id: number;
  loading: boolean;

  private image: any;
  private fileRef: string;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
              private technologyService: TechnologyService, private angularStorage: AngularFireStorage) { 
    this.id = null;
    this.loading = false;
    this.loadImportantOption();
    this.loadCategories();
    this.buildForm();
  }

  ngOnInit() {
    this.getParam();
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  saveTechnologyProccess(event: Event): void {
    event.preventDefault();
    if (this.technologyForm.valid) { 
      this.loading = true;
      const technology: Technology = this.technologyForm.value;
      this.uploadImage({ ...technology, id: this.id}, this.image);
    }
  }

  private uploadImage(technology: Technology, image: File) {
    this.filePath = `images/technology/${image.name}`;
    const fileRef = this.angularStorage.ref(this.filePath);
    const task = this.angularStorage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.finalizeProccess(technology);
          });
        })
      ).subscribe();
  }

  private buildForm(): void {
    this.technologyForm = this.formBuilder.group({
      id: [null],
      technologyName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      priority: [null, [Validators.required]],
      image: ['']
    });
  }

  private loadImportantOption(): void {
    this.importantOption = [ { value: false, display: 'No' }, { value: true, display: 'Yes' }];
  }

  private loadCategories(): void {
    const categoryList = ['FullStack', 'Backend', 'Frontend'];
    this.categories = categoryList.sort();
  }

  private getParam(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
          this.getTechnologyById(this.id);
        }
    });
  }

  private finalizeProccess(technology: Technology) {
    const technologyObj = { ...technology, image: this.downloadURL, fileRef: this.filePath};
    if (technologyObj.id) {
      this.updateTechnology(technologyObj);
    } else {
      this.saveTechnology(technologyObj);
    }

  }

  private saveTechnology(technology: Technology) {
    this.technologyService.save(technology).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/technology']);
        SwalUtils.showCreationMessage('technology');
      },
      error => {
        this.loading = false;
        SwalUtils.showErrorByHttpResponse(error, 'There was as error creating this technology, please try later.');
      }
    );
  }

  private updateTechnology(technology: Technology) {
    this.technologyService.update(technology).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/technology']);
        SwalUtils.showUpdatedMessage('technology');
      },
      error => {
        this.loading = false;
        SwalUtils.showErrorByHttpResponse(error, 'There was as error creating this technology, please try later.');
      }
    );
  }

  private getTechnologyById(id: number) {
    this.technologyService.findById(id).pipe(take(1)).subscribe(
      resp => {
        this.fileRef = resp.fileRef;
        const technology: Technology = { ...resp, id: id, fileRef: null};
        this.technologyForm.patchValue(technology);
      },
      error => {
        console.log(error);
      }
    );
  }
}
