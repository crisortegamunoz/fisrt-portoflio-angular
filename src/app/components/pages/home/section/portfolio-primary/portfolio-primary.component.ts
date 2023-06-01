import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../../core/model/project';

@Component({
  selector: 'app-portfolio-primary',
  templateUrl: './portfolio-primary.component.html',
  styleUrls: ['./portfolio-primary.component.scss']
})
export class PortfolioPrimaryComponent implements OnInit {

  @Input() project: Project;

  constructor(private router: Router) { 

  }

  ngOnInit() {
  }

  onGetProjectInformation(id: number) : void {
    this.router.navigate(['portfolio/portfolioDetail', id]);
  }

}
