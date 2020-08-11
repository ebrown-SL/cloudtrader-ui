import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IMine } from '../../../shared/models/mine.model';
import { CloudMineService } from '../mines.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-mine-detail',
  templateUrl: './mine-detail.component.html',
  styleUrls: ['./mine-detail.component.css'],
})
export class MineDetailComponent implements OnInit {
  mine: IMine;
  price: number = 15;
  total: number;
  stock: number;
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
    if (this.stock > this.mine.stock) {
      this.stock = this.mine.stock;
    }
    this.total = this.stock * this.price;
  }

  buyStock(): void {
    // TODO update mine stock and balance after purchase
    this.mineService.buyStock(this.mine, this.stock).subscribe((_) => {
      this.mine.stock -= this.stock;
    });
    this.updateTotal();
  }

  isValidPurchase(): void {
    if (this.stock > this.mine.stock || this.stock < 0) {
      this.blockBuy = true;
    } else {
      this.blockBuy = false;
    }
  }

  back(): void {
    this.location.back();
  }
}
