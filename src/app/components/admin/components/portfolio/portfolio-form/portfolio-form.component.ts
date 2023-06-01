import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { take, finalize } from 'rxjs/operators';

import { Display } from '../../../../../core/model/display';
import { Project } from '../../../../../core/model/project';
import { Technology } from '../../../../../core/model/Technology';
import { PortfolioService } from '../../../../../core/services/portfolio/portfolio.service';
import { TechnologyService } from '../../../../../core/services/technology/technology.service';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.scss']
})

export class PortfolioFormComponent implements OnInit {

  saving: boolean;
  importantOption: Display[];
  technologyArray: Technology[];
  roleList: string[];
  projectForm: FormGroup;
  id: number;
  hiddenUploadImage: boolean;

  private image: any;
  private fileRef: string;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
              private portfolioService: PortfolioService, private angularStorage: AngularFireStorage,
              private technologyService: TechnologyService) { 
    this.id = null;
    this.hiddenUploadImage = false;
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

  savePortfolioProccess(event: Event): void {
    event.preventDefault();
    if (this.projectForm.valid) { 
      const project: Project = this.projectForm.value;
      this.uploadImage({ ...project, id: this.id}, this.image);
    }
  }

  get technologyList(): FormArray {
    return this.projectForm.get('technologyList') as FormArray;
  }

  addTechnology() {
    this.technologyList.push(this.formBuilder.control(''));
  }

  private async loadForm() {
    const technologyResponse = await this.technologyService.getAll().toPromise();
    if (technologyResponse && technologyResponse.length > 0) {
      this.technologyArray = technologyResponse;
      this.loadImportantOption();
      this.loadRoles();
      this.buildForm();
    }
  }

  private loadImportantOption(): void {
    this.importantOption = [ { value: false, display: 'No' }, { value: true, display: 'Yes' }];
  }

  private loadRoles(): void {
    const roleList = ['Backend', 'Frontend', 'FullStack']
    this.roleList = roleList.sort();
  }
  

  private buildForm(): void {
    this.projectForm = this.formBuilder.group({
      id: [null],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      position: ['', [Validators.required]],
      aboutProjectOne: ['', [Validators.required]],
      aboutProjectTwo: ['', [Validators.required]],
      priority: [null, [Validators.required]],
      technologyList: this.formBuilder.array([
        this.formBuilder.control('')
      ]),
      image: ['', [Validators.required]]
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

  private uploadImage(project: Project, image: File) {
    this.saving = true;
    this.filePath = `images/portfolio/${image.name}`;
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

  private finalizeProccess(project: Project) {
    const projectObj: Project = { ...project, creation: new Date(), image: this.downloadURL, fileRef: this.filePath };
    if (projectObj.id) {
      this.updateProject(projectObj);
    } else {
      this.saveProject(projectObj);
    }

  }

  private saveProject(project: Project) {
    this.portfolioService.save(project).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/projects']);
        SwalUtils.showCreationMessage('project');
      },
      error => {
        this.saving = false;
        SwalUtils.showErrorByHttpResponse(error, 'There was as error creating this project, please try later.');
      }
    );
  }

  private updateProject(project: Project) {
    this.portfolioService.update(project).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/projects']);
        SwalUtils.showUpdatedMessage('project');
      },
      error => {
        this.saving = false;
        SwalUtils.showErrorByHttpResponse(error, 'There was as error updating this project, please try later.');
      }
    );
  }

  private getProjectById(id: number) {
    this.portfolioService.findById(id).pipe(take(1)).subscribe(
      resp => {
        this.fileRef = resp.fileRef;
        this.image = resp.image;
        this.hiddenUploadImage = true;
        const project: Project = { ...resp, id: id, fileRef: null, image: '' };
        this.projectForm.patchValue(project);
      },
      error => {
       console.log(error);
      }
    );
  }

}
