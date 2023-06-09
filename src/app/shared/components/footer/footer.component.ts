import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor() { 
    this.getYear();
  }

  ngOnInit() {

  }

  private getYear() {
    const today = new Date();
    this.year = today.getFullYear();
  }

}
