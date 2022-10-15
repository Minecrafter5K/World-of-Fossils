import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FossilDetailsComponent } from './details/fossil-details/fossil-details.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: ':id', component: FossilDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
