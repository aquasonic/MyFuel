import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarDetailViewComponent, CarListViewComponent, HomeViewComponent } from './components';

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
