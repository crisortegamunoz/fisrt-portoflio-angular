import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-technologies-detail',
  templateUrl: './technologies-detail.component.html',
  styleUrls: ['./technologies-detail.component.scss']
})
export class TechnologiesDetailComponent implements OnInit {

  @Input() technology;

  constructor() { }

  ngOnInit() {
  }

}
