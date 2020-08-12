import { Component, OnInit, Input } from '@angular/core';
import { IMine } from 'src/app/shared/models/mine.model';
import { CloudMineService } from '../mines.service';

@Component({
  selector: 'app-mine-buy',
  templateUrl: './mine-buy.component.html',
  styleUrls: ['./mine-buy.component.css'],
})
export class MineBuyComponent implements OnInit {
  @Input() mine: IMine;
  transactionTotal: number;
  transactionStock: number;
  blockBuy: boolean = false;

  constructor(private mineService: CloudMineService) {}

  ngOnInit(): void {}

  updateTotal(): void {
    if (this.transactionStock > this.mine.stock || this.transactionStock < 0) {
      this.transactionStock = this.mine.stock;
    }
    this.transactionTotal = this.transactionStock * this.mine.price;
  }

  buyStock(): void {
    // TODO update mine stock and balance after purchase
    this.mineService
      .buyStock(this.mine, this.transactionStock)
      .subscribe((_) => {
        this.mine.stock -= this.transactionStock;
      });
    this.updateTotal();
  }

  isValidPurchase(): void {
    if (this.transactionStock > this.mine.stock || this.transactionStock < 0) {
      this.blockBuy = true;
    } else {
      this.blockBuy = false;
    }
  }
}
