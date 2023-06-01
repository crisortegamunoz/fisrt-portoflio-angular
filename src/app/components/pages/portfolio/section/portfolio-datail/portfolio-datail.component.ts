import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';



import { PortfolioService } from '../../../../../core/services/portfolio/portfolio.service';
import { Project } from '../../../../../core/model/project';
import { Technology } from '../../../../../core/model/technology';
import { CommonUtils } from '../../../../../core/util/common';
import { SwalUtils } from '../../../../../core/util/swalfire-util';

@Component({
  selector: 'app-portfolio-datail',
  templateUrl: './portfolio-datail.component.html',
  styleUrls: ['./portfolio-datail.component.scss']
})
export class PortfolioDatailComponent implements OnInit {

  loading: boolean;
  project: Project;
  technologyList: Technology[];
  descriptionList: String[];

  constructor(private route: ActivatedRoute, private router: Router, private portfolioService: PortfolioService) {
    this.technologyList = [];
    this.loading = true; 
    this.project = null;
    this.descriptionList = [];
  }

  ngOnInit() {
    this.getProjectDetail();
  }

  onSearchByTechnology(name: string): void {
    this.router.navigate(['portfolio', name]);
  }

  private getProjectDetail(): void {
    const param: string | number = this.getParam();
    let id: number;

    if (!CommonUtils.undefinedNullOrEmpty(param)) {
      try {
        id = parseFloat(param);
      } catch (error) {
        SwalUtils.showErrorEmptyParam('proyecto');
        this.router.navigate(['portfolio']);
      }
    }
    
    this.portfolioService.findById(id)
      .pipe(take(1)).subscribe(
        snapshot => {
          if (snapshot != null) {
            this.project = snapshot;
            this.descriptionList = this.project.aboutProjectOne.split(/\n/ig);
            this.loadTechnologyList(this.project.technologyList);
          } else {
            SwalUtils.showErrorEmptyParam('proyecto');
            this.router.navigate(['portfolio']);
          }
          this.loading = false;
        },
        error => {
          const NOT_FOUND = SwalUtils.showErrorByHttpResponse(error, 'proyecto');
          if (NOT_FOUND) {
            this.router.navigate(['portfolioDetail/not-found']);
          }
        }
      );
  }

  private getParam(): string {
    return this.route.snapshot.params.id;
  }

  private loadTechnologyList(technologyList: Technology[]): void {
    if (technologyList.length > 0) {
      technologyList.forEach(technology => {
        if (this.technologyList.length <= 4) {
          if (technology.technologyName.toLocaleLowerCase() === 'git' || technology.technologyName.toLocaleLowerCase() === 'java' ||
              technology.technologyName.toLocaleLowerCase() === 'angular' || technology.technologyName.toLocaleLowerCase() === 'extjs' ||
              technology.technologyName.toLocaleLowerCase() === 'spring boot' || technology.technologyName.toLocaleLowerCase() === 'nodejs') {
                this.technologyList.push(technology);
          }
        }
      });
    }
  }

}
