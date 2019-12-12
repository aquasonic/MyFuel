import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarDetailViewComponent } from './components/car-detail-view/car-detail-view.component';
import { CarListViewComponent } from './components/car-list-view/car-list-view.component';
import { HomeViewComponent } from './components/home-view/home-view.component';

const routes: Routes = [
  { path: ':user/:car', component: CarDetailViewComponent, pathMatch: 'full' },
  { path: ':user', component: CarListViewComponent, pathMatch: 'full' },
  { path: '', component: HomeViewComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
