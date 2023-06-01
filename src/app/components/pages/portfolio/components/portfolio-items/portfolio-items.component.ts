import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../../../core/model/project';

@Component({
  selector: 'app-portfolio-items',
  templateUrl: './portfolio-items.component.html',
  styleUrls: ['./portfolio-items.component.scss']
})
export class PortfolioItemsComponent implements OnInit {

  @Input() project: Project;

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
  }

  onGetProjectInformation(id: number) : void {
    this.router.navigate(['portfolio/portfolioDetail', id]);
  }

}
