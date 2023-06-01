import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AboutMe } from '../../../core/model/about-me';
import { Project } from '../../../core/model/project';
import { Technology } from '../../../core/model/technology';
import { Laboratory } from '../../../core/model/laboratory';


import { AboutMeService } from '../../../core/services/about-me/about-me.service';
import { PortfolioService } from '../../../core/services/portfolio/portfolio.service';
import { TechnologyService } from '../../../core/services/technology/technology.service';
import { LaboratoryService } from '../../../core/services/laboratory/laboratory.service';
import { SwalUtils } from '../../../core/util/swalfire-util';
import { SearchResults } from 'src/app/core/model/response/search-results';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  loading: Boolean;
  bannerInformation: AboutMe;
  aboutMe: AboutMe;
  technologyList: Technology[];
  portfolioLeft: Project[];
  portfolioPrincipal: Project;
  portfolioRight: Project[];
  laboratoryPrincipal: Laboratory;
  laboratoryArray: Laboratory[];

  constructor(private aboutMeService: AboutMeService, private portfolioService: PortfolioService, 
              private technologyService: TechnologyService, private laboratoryService: LaboratoryService,
              private router: Router) { 
    this.loading = true;
    this.bannerInformation = null;
    this.aboutMe = null;
    this.portfolioLeft = [];
    this.portfolioPrincipal = null;
    this.portfolioRight = [];
    this.laboratoryPrincipal = null;
    this.laboratoryArray = [];
    this.technologyList = [];
  }

  ngOnInit(): void {
    this.loadInformationProccess();
  }

  private loadInformationProccess() {
    this.getHomeInformation();
  }

  private async getHomeInformation() {
    try {
      const aboutMeResult = await this.aboutMeService.findByPage(1, 2).toPromise();
      const portfolioResult = await this.portfolioService.getImportant().toPromise();
      const technologyResult = await this.technologyService.getImportant().toPromise();
      const laboratoryResult = await this.laboratoryService.findByPage(1, 3).toPromise();
      
      this.loadPersonalInformation(aboutMeResult);
      this.loadProjects(portfolioResult);
      this.loadTechnologies(technologyResult);
      this.loadLabarotories(laboratoryResult);
    
      this.loading = false;
    } catch (error) {
      const doSomething: boolean = SwalUtils.showErrorByHttpResponse(error, null);
      if (doSomething) {
        this.router.navigate(['page-not-found']);
      }

    }
    
  }

  private loadPersonalInformation(results: SearchResults<AboutMe>): void {
    if (results && results.searchResults && results.searchResults.length > 0) {
      const personalInformationList = results.searchResults;
      this.bannerInformation = personalInformationList.shift();
      this.aboutMe = personalInformationList.shift();
    }
      
  }

  private loadProjects(results: Project[]): void {
    if (results && results.length > 0) {
      const portfolioList = results;
      this.portfolioPrincipal = this.getMarketingProject(portfolioList);
      if (this.portfolioPrincipal) {
        const index = portfolioList.indexOf(this.portfolioPrincipal);
        portfolioList.splice(index, 1);
        this.portfolioLeft.push(portfolioList.shift());
        this.portfolioLeft.push(portfolioList.shift());
        this.portfolioRight.push(portfolioList.shift());
        this.portfolioRight.push(portfolioList.shift());
      } else {
        this.loadProjectDefault(portfolioList);
      }
    }
  }

  private loadTechnologies(results: Technology[]): void {
    if (results && results.length > 0) {
      this.technologyList = results;
    }
  }

  private loadLabarotories(result: SearchResults<Laboratory>): void {
    if (result && result.searchResults && result.searchResults.length > 0) {
      const laboratories = result.searchResults;
      this.laboratoryPrincipal = laboratories.shift();

      if (laboratories.length > 0) {
        laboratories.forEach(laboratory => {
          this.laboratoryArray.push(laboratory);
        });
      }
    }
      
  }

  private getMarketingProject(portfolioList: Project[]) {
    const hasMarketing = ({ name }) => name === 'Campaña Comercial';
    const marketing = portfolioList.filter(hasMarketing);
    
    if (marketing.length > 0) {
      return marketing[0];
    }

    return null;
  }

  private loadProjectDefault(portfolioList: Project[]): void {
    for (let i = 0; i < portfolioList.length; i++ ) {      
      if (i === 0 || i === 1) {
        this.portfolioLeft.push(portfolioList[i]);
      } else if (i === 2) {
        this.portfolioPrincipal = portfolioList[i];
      } else if (i === 3 || i === 4) {
        this.portfolioRight.push(portfolioList[i]);
      }
    }
  }

}