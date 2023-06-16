import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FossilDetailsComponent } from './fossil/fossil-details/fossil-details.component';
import { NotFoundComponent } from './util/not-found/not-found.component';
import { HomeComponent } from './util/home/home.component';
import { ExploreFossilsComponent } from './fossil/explore-fossils/explore-fossils.component';
import { CreateFossilComponent } from './fossil/create-fossil/create-fossil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadImagesComponent } from './util/upload-images/upload-images.component';
import { LoginComponent } from './user/login/login.component';
import { ThreeDViewComponent } from './util/three-d-view/three-d-view.component';
import { SinginComponent } from './user/singin/singin.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { WelcomeComponent } from './util/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeDViewComponent,
    FossilDetailsComponent,
    NotFoundComponent,
    HomeComponent,
    ExploreFossilsComponent,
    CreateFossilComponent,
    UploadImagesComponent,
    LoginComponent,
    ThreeDViewComponent,
    SinginComponent,
    DashboardComponent,
    WelcomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
