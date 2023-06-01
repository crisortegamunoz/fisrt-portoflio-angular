import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

import { Laboratory } from '../../../../../core/model/laboratory';
import { Technology } from '../../../../../core/model/Technology';
import { LaboratoryService } from '../../../../../core/services/laboratory/laboratory.service';
import { TechnologyService } from '../../../../../core/services/technology/technology.service';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

@Component({
  selector: 'app-lab-form',
  templateUrl: './lab-form.component.html',
  styleUrls: ['./lab-form.component.scss']
})
export class LabFormComponent implements OnInit {

  saving: boolean;
  technologyArray: Technology[];
  laboratoryForm: FormGroup;
  id: number;

  private image: any;
  private fileRef: string;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
              private laboratoryService: LaboratoryService, private angularStorage: AngularFireStorage,
              private technologyService: TechnologyService) { 
    this.id = null;
    this.technologyArray = [];
    this.saving = false;
    this.loadForm();
  }

  ngOnInit() {
    this.getParam();
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  saveLaboratoryProccess(event: Event): void {
    event.preventDefault();
    if (this.laboratoryForm.valid) { 
      const project: Laboratory = this.laboratoryForm.value;
      this.uploadImage({ ...project, id: this.id}, this.image);
    }
  }

  get technologyList() {
    return this.laboratoryForm.get('technologyList') as FormArray;
  }

  addTechnology() {
    this.technologyList.push(this.formBuilder.control(''));
  }

  private async loadForm() {
    const technologyResponse = await this.technologyService.getAll().toPromise();
    if (technologyResponse && technologyResponse.length > 0) {
      this.technologyArray = technologyResponse;
      this.buildForm();
    }
  }

  private buildForm(): void {
    this.laboratoryForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      laboratoryDescription: ['', [Validators.required]],
      urlRepo: [''],
      urlDemo: [''],
      image: ['', [Validators.required]],
      technologyList: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
    });
  }

  private getParam(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
          this.getProjectById(this.id);
        }
    });
  }

  private uploadImage(project: Laboratory, image: File) {
    this.saving = true;
    this.filePath = `images/laboratory/${image.name}`;
    const fileRef = this.angularStorage.ref(this.filePath);
    const task = this.angularStorage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.finalizeProccess(project);
          });
        })
      ).subscribe();
  }

  private finalizeProccess(laboratory: Laboratory) {
    const laboratoryObj = { ...laboratory, creation: new Date(), image: this.downloadURL, fileRef: this.filePath };
    if (laboratoryObj.id) {
      this.updateProject(laboratoryObj);
    } else {
      this.saveProject(laboratoryObj);
    }
  }

  private saveProject(laboratory: Laboratory) {
    this.laboratoryService.save(laboratory).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/lab']);
        SwalUtils.showCreationMessage('laboratory');
        this.saving = false;
      },
      error => {
        SwalUtils.showErrorByHttpResponse(error, 'There was as error creating this laboratory, please try later.');
      }
    );
  }

  private updateProject(laboratory: Laboratory) {
    this.laboratoryService.update(laboratory).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/lab']);
        SwalUtils.showUpdatedMessage('laboratory');
        this.saving = false;
      },
      error => {
        SwalUtils.showErrorByHttpResponse(error, 'There was as error updating this laboratory, please try later.');
      }
    );
  }

  private getProjectById(id: number) {
    this.laboratoryService.findById(id).pipe(take(1)).subscribe(
      resp => {
        this.fileRef = resp.fileRef;
        const laboratory: Laboratory = { ...resp, id: id, fileRef: null};
        this.laboratoryForm.patchValue(laboratory);
      },
      error => {
        
      }
    );
  }

}
