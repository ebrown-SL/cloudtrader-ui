import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { CloudMineService } from '../mines/mines.service';
import { MineStock } from 'src/app/shared/models/mineStock.model';
import { IMine } from 'src/app/shared/models/mine.model';

@Component({
  selector: 'app-user-stock',
  templateUrl: './user-stock.component.html',
  styleUrls: ['./user-stock.component.css'],
})
export class UserStockComponent implements OnInit {
  currentUser: User;
  userMines: MineStock;
  pageTitle: string;

  constructor(
    private authService: AuthService,
    private mineService: CloudMineService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getUserMines();
    this.pageTitle = `${this.currentUser.username}'s Stocks`;
  }

  getTotalStock(): number {
    let totalStock: number = 0;
    this.userMines.cloudStock.forEach(
      (stockDetail) => (totalStock = totalStock + stockDetail.stock)
    );
    return totalStock;
  }

  getCurrentUser(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  getMine(id: number): IMine {
    return this.mineService.getLocalCloudMines().find((mine) => mine.id == id);
  }

  getUserMines(): void {
    this.mineService
      .getUserStock()
      .subscribe((mines) => (this.userMines = mines));
  }
}
