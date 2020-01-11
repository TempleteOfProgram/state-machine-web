import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './start/start.module#StartModule'
  },
  {
    path : 'plumb',
    loadChildren : './home/home.module#HomeModule',
  },
  // default component
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
