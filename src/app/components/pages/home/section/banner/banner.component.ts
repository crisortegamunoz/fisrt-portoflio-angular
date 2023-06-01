import { Component, OnInit, Input } from '@angular/core';
import { AboutMe } from '../../../../../core/model/about-me';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() bannerInformation: AboutMe;

  constructor() { }

  ngOnInit() {
  }

}
