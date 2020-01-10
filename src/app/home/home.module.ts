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
import { MatMenuModule } from '@angular/material/menu';
import { WorkflowNameComponent } from './workflow-name/workflow-name.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [NodeContainerComponent, NodeComponent, MainComponent, WorkflowNameComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  entryComponents: [NodeComponent],
  // bootstrap: [MainComponent],
  providers: [NodeService,
              NodeComponent,
              {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
})

export class HomeModule { }
