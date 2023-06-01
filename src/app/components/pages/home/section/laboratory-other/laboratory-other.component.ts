import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Laboratory } from '../../../../../core/model/laboratory';

@Component({
  selector: 'app-laboratory-other',
  templateUrl: './laboratory-other.component.html',
  styleUrls: ['./laboratory-other.component.scss']
})
export class LaboratoryOtherComponent implements OnInit {

  @Input() laboratory: Laboratory;

  constructor(private router: Router) { 
    
  }

  ngOnInit() {

  }

  onSearchLaboratory(id: number): void  {
      this.router.navigate(['laboratory/laboratoryDetail', id]);
  }

}
