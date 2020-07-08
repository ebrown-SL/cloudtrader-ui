import { Component, OnInit } from '@angular/core';
import { CloudMineService } from './cloud-mine-list.service'

@Component({
  selector: 'cloud-mine-list',
  templateUrl: './cloud-mine-list.component.html',
  styleUrls: ['./cloud-mine-list.component.css']
})

export class CloudMineListComponent implements OnInit{
  pageTitle: string = 'Cloud Mines';
  listFilter: string = 'cart';
  mines: any[];

  constructor(private cloudMineService: CloudMineService) {
  }

  ngOnInit(): void {
    // this.cloudMineService.getLocalCloudMines().subscribe({
    //   next: mines => {
    //     this.mines = mines;
    //   }
    // })
    this.mines = this.cloudMineService.getLocalCloudMines()
  }
}