import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MINES } from './mine-data';
import { IMine } from '../../shared/models/mine.model';
import { MinePurchase } from '../../shared/models/purchase.model';

@Injectable({
  providedIn: 'root',
})
export class CloudMineService {
  constructor(private httpClient: HttpClient) { }

  getCloudMines(): Observable<IMine[]> {
    return this.httpClient
      .get<IMine[]>(`${environment.baseUrl}/api/mine`)
      .pipe(catchError(this.handleError));
  }

  getCloudMine(mine: IMine | string): Observable<IMine> {
    // TODO expose endpoint in main API
    return;
  }

  buyStock(mine: IMine, stock: number): Observable<any> {
    const purchaseAmount = mine.price * stock;
    const transaction: MinePurchase = {
      mineId: mine.id,
      quantity: stock,
      purchaseAmount
    }
    this.httpClient.post((`${environment.baseUrl}/api/User/current/stock/buy`), transaction)
      .pipe(catchError(this.handleError));
    return of(mine);
  }

  /* LOCAL METHODS */

  getLocalCloudMine(mine: IMine | string): Observable<IMine> {
    const id = typeof mine === 'string' ? mine : mine.id;
    return of(MINES.find((mine) => mine.id == id));
  }

  getLocalCloudMines(): Observable<IMine[]> {
    return of(MINES);
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
