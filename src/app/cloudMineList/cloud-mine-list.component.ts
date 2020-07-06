import { Component } from '@angular/core';
import * as mines from './mine-data.json'

@Component({
  selector: 'cloud-mine-list',
  templateUrl: './cloud-mine-list.component.html',
  styleUrls: ['./cloud-mine-list.component.css']
})

export class CloudMineListComponent {
  pageTitle: string = 'Cloud Mines';
  listFilter: string = 'cart';
  mines: any[] = (mines as any).default;
}