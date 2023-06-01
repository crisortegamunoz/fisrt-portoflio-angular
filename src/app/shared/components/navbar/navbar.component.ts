import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showBurgerMenu(): void {
    const burgerMenu = document.querySelector('.burger-menu')
    const navbarCollapse = document.querySelector('.navbar-collapse');
    burgerMenu.classList.toggle('active');
    navbarCollapse.classList.toggle('show');
  }


}
