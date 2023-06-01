import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Laboratory } from '../../../../../core/model/laboratory';
import { Technology } from '../../../../../core/model/technology';
import { LaboratoryService } from '../../../../../core/services/laboratory/laboratory.service';
import { CommonUtils } from '../../../../../core/util/common';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-laboratory-detail',
  templateUrl: './laboratory-detail.component.html',
  styleUrls: ['./laboratory-detail.component.scss']
})
export class LaboratoryDetailComponent implements OnInit {

  loading: boolean;
  laboratory: Laboratory;
  technologyList: Technology[];
  descriptionList: String[];

  constructor(private route: ActivatedRoute, private router: Router, private laboratoyService: LaboratoryService) { 
    this.technologyList = [];
    this.loading = true; 
    this.laboratory = null;
    this.descriptionList = [];
  }

  ngOnInit() {
    this.getLaboratoryDetail();
  }

  onSearchByTechnology(name: string): void {
    this.router.navigate(['laboratory', name]);
  }

  private getLaboratoryDetail(): void {
    const param: string | number = this.getParam();
    let id: number;

    if (!CommonUtils.undefinedNullOrEmpty(param)) {
      try {
        id = parseFloat(param);
      } catch (error) {
        SwalUtils.showErrorEmptyParam('laboratorio');
        this.router.navigate(['laboratory']);
      }
    }

    this.laboratoyService.findById(id)
      .pipe(take(1)).subscribe(snapshot => {
        if (snapshot != null) {
          this.laboratory = snapshot;
          this.descriptionList = this.laboratory.laboratoryDescription.split(/\n/ig);
          this.loadTechnologyList(this.laboratory.technologyList);
        } else {
          Swal.fire('Ups!', 'El projecto del Laboratorio que estas buscando no existe.', 'error');
          this.router.navigate(['laboratory']);
        }
        this.loading = false;
      });
  }

  private getParam(): string {
    return this.route.snapshot.params.id;
  }

  private loadTechnologyList(technologyList: Technology[]): void {
    if (technologyList.length > 0) {
      technologyList.forEach(technology => {
        if (this.technologyList.length <= 4) {
            this.technologyList.push(technology);
        }
      });
    }
  }

}
