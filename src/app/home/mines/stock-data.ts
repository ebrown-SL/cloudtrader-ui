import { CloudStock } from 'src/app/shared/models/cloud.model';
let num = 2;

export function STOCK_DATA(): CloudStock[] {
  let stock: CloudStock[] = [
    {
      mineId: "f927d68d-6909-4992-aab5-3f56ff2ac394",
      stock: num
    }
  ]
  num += 1;
  return stock;
}
