import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { NodeComponent } from './node/node.component';



@NgModule({
  declarations: [HomeComponent, NodeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,



  ],
  providers: []
})
export class HomeModule {}
