import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SettingsService } from "./settings.service";
import { Settings } from "./settings";

@Injectable({ providedIn: 'root' })
export class SettingsHttpService {

    constructor(private http: HttpClient, private settingsService: SettingsService) {
    }

    initializeApp(): Promise<any> {

        const requestHeaders = new HttpHeaders().set('Exact-Url', 'true')

        return new Promise(
            (resolve) => {
                this.http.get('assets/settings.json', {
                    headers: requestHeaders
                })
                    .toPromise()
                    .then(response => {
                        this.settingsService.settings = <Settings>response;
                        resolve();
                    }
                    )
            }
        );
    }
}