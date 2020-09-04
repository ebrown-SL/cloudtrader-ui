import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IMine } from '../../../shared/models/mine.model';
import { CloudMineService } from '../mines.service';
import { CloudStock } from 'src/app/shared/models/cloud.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mine-detail',
  templateUrl: './mine-detail.component.html',
  styleUrls: ['./mine-detail.component.css'],
})
export class MineDetailComponent implements OnInit {
  mine: IMine;
  userStock: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private mineService: CloudMineService
  ) { }

  ngOnInit(): void {
    this.getMine();
    this.getUserStock();
  }

  getMine(): void {
    // TODO API mines don't have prices
    const id = this.route.snapshot.paramMap.get('id');
    this.mineService
      .getCloudMine(id)
      .subscribe((mine) => (this.mine = mine.price ? mine : { ...mine, price: 10 }));
  }

  getUserStock(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.mineService
      .getLocalUserStock()
      .subscribe(userStock => this.userStock = userStock.find(cloud => cloud.mineId === id).stock);
  }

  back(): void {
    this.location.back();
  }
}
