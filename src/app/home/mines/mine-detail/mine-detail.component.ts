import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IMine } from '../../../shared/models/mine.model';
import { CloudMineService } from '../mines.service';

@Component({
  selector: 'app-mine-detail',
  templateUrl: './mine-detail.component.html',
  styleUrls: ['./mine-detail.component.css'],
})
export class MineDetailComponent implements OnInit {
  mine: IMine;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private mineService: CloudMineService
  ) {}

  ngOnInit(): void {
    this.getMine();
  }

  getMine(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.mineService
      .getLocalCloudMine(id)
      .subscribe((mine) => (this.mine = mine));
  }

  back(): void {
    this.location.back();
  }
}
