import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit {

  @Input() technology;

  constructor() { }

  ngOnInit() {
  }

}
