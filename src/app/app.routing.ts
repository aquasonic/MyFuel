import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarDetailViewComponent } from './views/car-detail-view/car-detail-view.component';
import { CarListViewComponent } from './views/car-list-view/car-list-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';

const routes: Routes = [
  { path: ':user/:car', component: CarDetailViewComponent, pathMatch: 'full' },
  { path: ':user', component: CarListViewComponent, pathMatch: 'full' },
  { path: '', component: HomeViewComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
