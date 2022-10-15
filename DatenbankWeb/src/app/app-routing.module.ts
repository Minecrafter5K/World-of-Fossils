import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFossilComponent } from './fossil/create-fossil/create-fossil.component';
import { FossilDetailsComponent } from './fossil/fossil-details/fossil-details.component';
import { ExploreFossilsComponent } from './fossil/explore-fossils/explore-fossils.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './util/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'explore', component: ExploreFossilsComponent },
  { path: 'fossil/:id', component: FossilDetailsComponent },
  { path: 'new', component: CreateFossilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
