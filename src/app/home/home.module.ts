import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NodeContainerComponent } from './node-container/node-container.component';
import { NodeComponent } from './create-node/node.component';
import { FormsModule } from '@angular/forms';
import { NodeService } from '../shared/services/node-service.service';
import { MainComponent } from './display-container/main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [NodeContainerComponent, NodeComponent, MainComponent, ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  entryComponents: [NodeComponent],
  // bootstrap: [MainComponent],
  providers: [NodeService,
              NodeComponent]
})

export class HomeModule { }
