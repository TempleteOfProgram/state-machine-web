import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Declares our routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// These are the materials that will make our site adaptable
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';


import { NavbarComponent } from './navbar/navbar.component';
import { WorkflowServicesService } from './services/workflow-services.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,

    // HTTP requests
    HttpClientModule,

    BrowserAnimationsModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,


    // Our Routes will be here to make code cleaner
    AppRoutingModule,

  ],
  providers: [
    WorkflowServicesService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
