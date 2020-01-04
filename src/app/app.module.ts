import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';

// Declaring Compoments and services
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkflowServicesService } from './shared/services/workflow-services.service';


// These are the materials that will make our site adaptable
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // HTTP requests
    HttpClientModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,


    // Our Routes will be here to make code cleaner
    AppRoutingModule,

  ],
  providers: [
    WorkflowServicesService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
