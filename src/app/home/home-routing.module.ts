import { NodeContainerComponent } from './node-container/node-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NodeComponent } from './node/node.component';

const routes: Routes = [
  {
    path: '',
    component: NodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
