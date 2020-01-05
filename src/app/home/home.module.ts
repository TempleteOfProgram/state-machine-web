import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { NodeContainerComponent } from './node-container/node-container.component';
import { NodeComponent } from './node/node.component';
import { FormsModule } from '@angular/forms';
import { NodeService } from '../shared/services/node-service.service';
import { MainComponent } from './main/main.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NodeContainerComponent, NodeComponent, MainComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  entryComponents: [NodeComponent],
  // bootstrap: [MainComponent],
  providers: [NodeService, NodeComponent],
})

export class HomeModule { }
