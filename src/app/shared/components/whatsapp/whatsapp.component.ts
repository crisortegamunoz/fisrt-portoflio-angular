import { Component, OnInit } from '@angular/core';

import { WhatsappService } from '../../../core/services/whatsapp/whatsapp.service';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {

  constructor(private whatsappService: WhatsappService) { 

  }

  ngOnInit() {

  }

  onWhatsappWindow(): void {
    this.whatsappService.onClickOnNumber();
  }

}
