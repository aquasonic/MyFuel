import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent, CarDetailViewComponent, CarListViewComponent } from './components';

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
