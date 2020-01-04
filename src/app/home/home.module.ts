import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NodeContainerComponent } from './node-container/node-container.component';
import { NodeComponent } from './node/node.component';

@NgModule({
  declarations: [NodeContainerComponent, NodeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
