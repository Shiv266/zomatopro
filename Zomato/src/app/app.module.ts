import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Importing Router Module
import { RouterModule, Routes, Router } from '@angular/router';
// Importing Forms Module
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//components
import { DetailviewComponent } from './detailview/detailview.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
//Importing http module for http request
import { HttpModule } from '@angular/http';
//service of our project
import { ZomatoService } from './zomato.service';
import { CookieService } from 'ngx-cookie-service';
// for animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// used toaster 
import { ToastrModule } from 'ngx-toastr';
//decorator
@NgModule({
  declarations: [
    AppComponent,
    DetailviewComponent,
    RestaurantsComponent,
    ErrorpageComponent
  ],
  // contain all the modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // configuring paths
    RouterModule.forRoot([
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' },
      { path: 'restaurants', component: RestaurantsComponent },
      { path: 'detailview/:resid', component: DetailviewComponent },
      { path: '**', component: ErrorpageComponent }
    ])
  ],
  providers: [ZomatoService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
