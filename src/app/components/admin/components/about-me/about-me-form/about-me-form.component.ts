import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

import { AboutMe } from '../../../../../core/model/about-me';
import { AboutMeService } from '../../../../../core/services/about-me/about-me.service';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

@Component({
  selector: 'app-about-me-form',
  templateUrl: './about-me-form.component.html',
  styleUrls: ['./about-me-form.component.scss']
})
export class AboutMeFormComponent implements OnInit {

  id: number;
  aboutMeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, 
              private activatedRoute: ActivatedRoute, private aboutMeService: AboutMeService) { 
    this.id = null;
    this.buildForm();
  }

  ngOnInit() {
    this.getParam();
  }

  saveInformation(event: Event) {
    event.preventDefault();
    if (this.aboutMeForm.valid) { 
      const aboutme: AboutMe = this.aboutMeForm.value;
      if (aboutme.id) {
        this.updatePersonalInformation(aboutme);
      } else {
        this.createPersonalInformation(aboutme);
      }
    }
  }

  private buildForm(): void {
    this.aboutMeForm = this.formBuilder.group({
      id: [null],
      descriptionTitle: ['', [Validators.required]],
      descriptionOne: ['', [Validators.required]],
      descriptionTwo: [''],
      descriptionThree: ['']
    });
  }

  private getParam(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
        if (params.id) {
          this.id = params.id;
          this.getPersonalInformationById(this.id);
        }
    });
  }

  private createPersonalInformation(aboutme: AboutMe): void {
    this.aboutMeService.save(aboutme).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/about-me']);
        SwalUtils.showCreationMessage('information');
      },
      error => {
        SwalUtils.showErrorByHttpResponse(error, 'There was an error creating this information, please try later.');
      }
    );
  }

  private updatePersonalInformation(aboutme: AboutMe): void {
    this.aboutMeService.update(aboutme).pipe(take(1)).subscribe(
      resp => {
        this.router.navigate(['./admin/about-me']);
        SwalUtils.showUpdatedMessage('information');
      },
      error => {
        SwalUtils.showErrorByHttpResponse(error, 'There was an error updating this information, please try later.');
      }
    );
  }

  private getPersonalInformationById(id: number): void {
    this.aboutMeService.findById(id)
      .pipe(take(1)).subscribe(
        resp => {
          const aboutMe: AboutMe = { ...resp, id: id};
          this.aboutMeForm.patchValue(aboutMe);
        },
        error => {
         
        }
      );
  }

}
