import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NodeContainerComponent } from './node-container/node-container.component';
import { NodeComponent } from './node/node.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NodeContainerComponent, NodeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ],
  entryComponents: [NodeComponent],
})
export class HomeModule { }
