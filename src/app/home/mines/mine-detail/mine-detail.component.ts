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
  price: number = 15;
  total: number;
  buyStock: number;
  blockBuy: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private mineService: CloudMineService
  ) {}

  ngOnInit(): void {
    this.getMine();
  }

  getMine(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mineService
      .getLocalCloudMine(id)
      .subscribe((mine) => (this.mine = mine));
  }

  updateTotal(): void {
    if (this.buyStock > this.mine.stock) {
      this.blockBuy = true;
    } else {
      this.blockBuy = false;
      this.total = this.buyStock * this.price;
    }
  }

  back(): void {
    this.location.back();
  }
}
