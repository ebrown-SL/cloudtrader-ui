import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './home/logout/logout.component';
import { HomeComponent } from './home/home.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { RegisterComponent } from './register/register.component';
import { CloudMineListComponent } from './home/mines/mine-list/cloud-mine-list.component'
import { RouterModule } from '@angular/router';
import { MenuComponent } from './home/menu/menu.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SettingsHttpService } from './settings/settings.http.service';
import { MineDetailComponent } from './home/mines/mine-detail/mine-detail.component';
import { MineBuyComponent } from './home/mines/mine-buy/mine-buy.component';

export function app_Init(settingsHttpService: SettingsHttpService) {
    return () => settingsHttpService.initializeApp();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    CloudMineListComponent,
    MenuComponent,
    DashboardComponent,
    MineDetailComponent,
    MineBuyComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
      },
      {
          provide: APP_INITIALIZER,
          useFactory: app_Init,
          deps: [SettingsHttpService],
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
