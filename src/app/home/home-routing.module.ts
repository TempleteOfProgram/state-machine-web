import { NodeContainerComponent } from './node-container/node-container.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowNameComponent } from './workflow-name/workflow-name.component';
// import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'name',
    component: WorkflowNameComponent
  },
  // {
  //   path: 'plumb',
  //   component: MainComponent
  // },
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
