import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import * as localMines from './mine-data.json'

@Injectable({
  providedIn: 'root'
})
export class CloudMineService {

  constructor(private httpClient: HttpClient) {}

  getCloudMines(): any {
    return this.httpClient.get(`${environment.baseUrl}/api/mine`).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  getLocalCloudMines(): any {
    return (localMines as any).default
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }
}