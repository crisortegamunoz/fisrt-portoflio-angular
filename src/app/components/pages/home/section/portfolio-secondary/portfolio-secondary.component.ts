import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../../core/model/project';

@Component({
  selector: 'app-portfolio-secondary',
  templateUrl: './portfolio-secondary.component.html',
  styleUrls: ['./portfolio-secondary.component.scss']
})
export class PortfolioSecondaryComponent implements OnInit {

  @Input() project: Project;

  constructor(private router: Router) { 

  }

  ngOnInit() {

  }

  onGetProjectInformation(id: number): void {
    this.router.navigate(['portfolio/portfolioDetail', id]);
  }

}
