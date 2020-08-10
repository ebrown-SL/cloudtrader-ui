import { Component, OnInit } from '@angular/core';
import { CloudMineService } from '../mines.service'
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cloud-mine-list',
  templateUrl: './cloud-mine-list.component.html',
  styleUrls: ['./cloud-mine-list.component.css']
})

export class CloudMineListComponent {
  pageTitle: string = 'Cloud Mines';

  constructor(private cloudMineService: CloudMineService) {
  }

  mines$ = this.cloudMineService.mines$
}