import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { throwError, of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MINES } from './mine-data';
import { IMine } from '../../shared/models/mine.model';
import { MinePurchase } from '../../shared/models/purchase.model';
import { CloudStock } from 'src/app/shared/models/cloud.model';
import { STOCK_DATA } from './stock-data';

@Injectable({
  providedIn: 'root',
})
export class CloudMineService {
  private currentUserStockSubject = new BehaviorSubject<CloudStock[]>(JSON.parse(localStorage.getItem('currentUserStock')));
  public readonly currentUserStock = this.currentUserStockSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  getCloudMines(): Observable<IMine[]> {
    return this.httpClient
      .get<IMine[]>(`/mine`)
      .pipe(
        map(data => data['mines']),
        catchError(this.handleError));
  }

  getCloudMine(mineId: string): Observable<IMine> {
    return this.httpClient.get<IMine>(`/mine/${mineId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  buyStock(mine: IMine, stock: number): Observable<any> {
    const purchaseAmount = mine.price * stock;
    const transaction: MinePurchase = {
      mineId: mine.id,
      quantity: stock,
      purchaseAmount
    }
    return this.httpClient.post((`/User/current/stock/buy`), transaction)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUserStock(): Observable<CloudStock[]> {
    return this.httpClient.get('/User/current/stock')
      .pipe(
        tap((userStock: CloudStock[]) => {
          localStorage.setItem('currentUserStock', JSON.stringify(userStock));
          this.currentUserStockSubject.next(userStock);
        }),
        catchError(this.handleError)
      );
  }

  /* LOCAL METHODS */

  getLocalCloudMine(mine: IMine | string): Observable<IMine> {
    const id = typeof mine === 'string' ? mine : mine.id;
    return of(MINES.find((mine) => mine.id == id));
  }

  getLocalCloudMines(): Observable<IMine[]> {
    return of(MINES);
  }

  getLocalUserStock(): Observable<CloudStock[]> {
    console.log(STOCK_DATA());
    return of(STOCK_DATA())
      .pipe(
        tap((userStock: CloudStock[]) => {
          localStorage.setItem('currentUserStock', JSON.stringify(userStock));
          this.currentUserStockSubject.next(userStock);
        }));
  }

  /* END LOCAL METHODS */

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
