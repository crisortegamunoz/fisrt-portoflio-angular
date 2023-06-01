import { Component, OnInit, Input } from '@angular/core';
import { Certificate } from '../../../../../core/model/certificate';


@Component({
  selector: 'app-courses-item',
  templateUrl: './courses-item.component.html',
  styleUrls: ['./courses-item.component.scss']
})
export class CoursesItemComponent implements OnInit {

  @Input() certificate: Certificate;

  constructor() { }

  ngOnInit() {
  }

  onImageLoad(event: Event): void {
    // cancelar cargando
  }

  onSeeCertificate(path: string): void {
    const win = window.open(path, '_blank');
    win.focus();
  }

}
