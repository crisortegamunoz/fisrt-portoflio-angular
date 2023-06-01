import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { AboutMe } from 'src/app/core/model/about-me';
import { WhatsappService } from '../../../../../core/services/whatsapp/whatsapp.service';

import Swiper, { Navigation, Pagination } from 'swiper';
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, AfterViewInit {

  @Input() aboutMe: AboutMe;
  images: String[];
  mySwiper: Swiper;

  constructor(private whatsappService: WhatsappService) { 
    this.loadImages();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.configSwiper();
  }

  onWhatsappWindow(): void {
    this.whatsappService.onClickOnNumber();
  }

  slideChange() : void {
    const documentSelected: any = document.querySelector('.swiper-container')
    const swiper = documentSelected.swiper;
    swiper.slideNext();
  }

  private configSwiper(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      loop: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }

  private loadImages(): void {
    this.images = [
      'assets/img/about-img-1.jpg',
      'assets/img/about-img-2.jpg'
    ];
  }

}
