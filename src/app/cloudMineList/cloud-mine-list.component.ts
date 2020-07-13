import { Component, OnInit } from '@angular/core';
import { CloudMineService } from './cloud-mine-list.service'
import { IMine } from './cloud-mine';

@Component({
  selector: 'cloud-mine-list',
  templateUrl: './cloud-mine-list.component.html',
  styleUrls: ['./cloud-mine-list.component.css']
})

export class CloudMineListComponent implements OnInit{
  pageTitle: string = 'Cloud Mines';
  listFilter: string = 'cart';
  mines: IMine[];

  constructor(private cloudMineService: CloudMineService) {
  }

  ngOnInit(): void {
    this.mines = this.cloudMineService.getLocalCloudMines()
    console.log(this.mines)
  }
}