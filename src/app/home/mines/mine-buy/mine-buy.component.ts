import { Component, OnInit, Input } from '@angular/core';
import { IMine } from 'src/app/shared/models/mine.model';
import { CloudMineService } from '../mines.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-mine-buy',
  templateUrl: './mine-buy.component.html',
  styleUrls: ['./mine-buy.component.css'],
})
export class MineBuyComponent implements OnInit {
  @Input() mine: IMine;
  transactionTotal: number;
  blockBuy: boolean = false;
  buyForm: FormGroup;

  get transactionStock(): AbstractControl {
    return this.buyForm.get('transactionStock');
  }

  constructor(private mineService: CloudMineService) {}

  ngOnInit(): void {
    this.buyForm = new FormGroup({
      transactionStock: new FormControl(0, {
        validators: [Validators.max(this.mine.stock), Validators.min(0)],
        updateOn: 'change',
      }),
    });
  }

  updateTotal(): void {
    this.transactionTotal = this.transactionStock.value * this.mine.price;
  }

  updateFormAndValidation(): void {
    const formTransactionStock: AbstractControl = this.buyForm.get(
      'transactionStock'
    );
    formTransactionStock.setValue(0);
    formTransactionStock.setValidators([
      Validators.max(this.mine.stock),
      Validators.min(0),
    ]);
    formTransactionStock.updateValueAndValidity();
    this.updateTotal();
  }

  buyStock(): void {
    // TODO update mine stock and balance after purchase
    if (this.buyForm.valid) {
      this.mineService
        .buyStock(this.mine, this.transactionStock.value)
        .subscribe((_) => {
          this.mine.stock -= this.transactionStock.value;
        });
      this.updateFormAndValidation();
    }
  }
}
