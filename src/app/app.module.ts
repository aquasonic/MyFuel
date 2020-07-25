import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsModule } from '@ngxs/store';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ActiveCarsComponent } from './components/active-cars/active-cars.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { ArchivedCarsComponent } from './components/archived-cars/archived-cars.component';
import { CarCreateComponent } from './components/car-create/car-create.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { CarDetailViewComponent } from './components/car-detail-view/car-detail-view.component';
import { CarDialogComponent } from './components/car-dialog/car-dialog.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FuelDialogComponent } from './components/fuel-dialog/fuel-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { CarState } from './state/car.state';
import { UserState } from './state/user.state';
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
    HeaderComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    CarListComponent,
    LoginComponent,
    ActiveCarsComponent,
    ArchivedCarsComponent,
    CarCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ApolloModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpLinkModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([UserState, CarState]),
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
