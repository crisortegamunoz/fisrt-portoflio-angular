import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Laboratory } from '../../../../../core/model/laboratory';

@Component({
  selector: 'app-laboratory-first',
  templateUrl: './laboratory-first.component.html',
  styleUrls: ['./laboratory-first.component.scss']
})
export class LaboratoryFirstComponent implements OnInit {

  @Input() laboratory: Laboratory;

  constructor(private router: Router) { 
    
  }

  ngOnInit() {
    
  }

  onSearchLaboratory(id: number): void  {
    this.router.navigate(['laboratory/laboratoryDetail', id]);
  }

}
