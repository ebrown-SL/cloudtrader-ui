import { Component, OnInit } from '@angular/core';
import { CloudMineService } from '../mines.service';
import { IMine } from 'src/app/shared/models/mine.model';

@Component({
  selector: 'cloud-mine-list',
  templateUrl: './cloud-mine-list.component.html',
  styleUrls: ['./cloud-mine-list.component.css'],
})
export class CloudMineListComponent implements OnInit {
  pageTitle: string = 'Cloud Mines';
  mines: IMine[];

  constructor(private cloudMineService: CloudMineService) {}

  ngOnInit(): void {
    this.getMines();
  }

  getMines(): void {
    this.cloudMineService
      .getLocalCloudMines()
      .subscribe((mines) => (this.mines = mines));
  }
}
