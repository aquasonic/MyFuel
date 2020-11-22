import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ClarityModule } from '@clr/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ActiveCarsComponent } from './components/active-cars/active-cars.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { ArchivedCarsComponent } from './components/archived-cars/archived-cars.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CreateCarButtonComponent } from './components/create-car-button/create-car-button.component';
import { CreateFuelButtonComponent } from './components/create-fuel-button/create-fuel-button.component';
import { DeleteCarButtonComponent } from './components/delete-car-button/delete-car-button.component';
import { DeleteFuelButtonComponent } from './components/delete-fuel-button/delete-fuel-button.component';
import { FuelFooterBarComponent } from './components/fuel-footer-bar/fuel-footer-bar.component';
import { FuelListComponent } from './components/fuel-list/fuel-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { MainContainerComponent } from './components/main-container/main-container.component';
import { ShellComponent } from './components/shell/shell.component';
import { UpdateCarButtonComponent } from './components/update-car-button/update-car-button.component';
import { UpdateFuelButtonComponent } from './components/update-fuel-button/update-fuel-button.component';
import { CarDialogComponent } from './dialogs/car-dialog/car-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from './dialogs/fuel-dialog/fuel-dialog.component';
import { CarState } from './state/car.state';
import { UserState } from './state/user.state';
import { CarDetailViewComponent } from './views/car-detail-view/car-detail-view.component';
import { CarListViewComponent } from './views/car-list-view/car-list-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';

export function InitializeAppFactory(translateService: TranslateService) {
  return () => translateService.use('de').toPromise();
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

export function createApolloOptions(httpLink: HttpLink) {
  return {
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      setContext(_ => ({
        headers: {
          Authorization: `Bearer ${environment.dbSecret}`
        }
      })),
      httpLink.create({ uri: environment.dbServer })
    ])
  };
}

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HomeViewComponent,
    CarListViewComponent,
    CarDetailViewComponent,
    CarDialogComponent,
    ConfirmDialogComponent,
    FuelDialogComponent,
    LoadingComponent,
    AlertMessageComponent,
    UpdateCarButtonComponent,
    DeleteCarButtonComponent,
    CarListComponent,
    LoginComponent,
    ActiveCarsComponent,
    ArchivedCarsComponent,
    CreateCarButtonComponent,
    MainContainerComponent,
    CreateFuelButtonComponent,
    FuelListComponent,
    FuelFooterBarComponent,
    DeleteFuelButtonComponent,
    UpdateFuelButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([UserState, CarState], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApolloOptions,
      deps: [HttpLink]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: InitializeAppFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
