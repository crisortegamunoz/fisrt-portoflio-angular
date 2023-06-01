import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Laboratory } from '../../../../../core/model/laboratory';

@Component({
  selector: 'app-laboratory-item',
  templateUrl: './laboratory-item.component.html',
  styleUrls: ['./laboratory-item.component.scss']
})
export class LaboratoryItemComponent implements OnInit {

  @Input() laboratory: Laboratory;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  onGetProjectInformation(id: number) : void {
    this.router.navigate(['laboratory/laboratoryDetail', id]);
  }


}
