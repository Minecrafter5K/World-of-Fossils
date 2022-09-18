import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CubeComponent } from './cube/cube.component';
import { FossilDetailsComponent } from './details/fossil-details/fossil-details.component';

const routes: Routes = [
  { path: ':id', component: FossilDetailsComponent },
  { path: '', component: CubeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
