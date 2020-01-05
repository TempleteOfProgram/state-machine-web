import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NodeContainerComponent } from './node-container/node-container.component';
import { NodeComponent } from './node/node.component';
import { FormsModule } from '@angular/forms';
import { NodeService } from '../shared/services/node-service.service';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [NodeContainerComponent, NodeComponent, MainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ],
  entryComponents: [NodeComponent],
  // bootstrap: [MainComponent],
  providers: [NodeService],
})
export class HomeModule { }
