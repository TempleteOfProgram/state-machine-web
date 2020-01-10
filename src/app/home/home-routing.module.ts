import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowNameComponent } from './workflow-name/workflow-name.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  // parameterized workflow url to retrive specific workflow
  {
    path: ':id',
    component: MainComponent
  },
  {
    path: 'name',
    component: WorkflowNameComponent
  },
  // default component
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
