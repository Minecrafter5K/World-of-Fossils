import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFossilComponent } from './fossil/create-fossil/create-fossil.component';
import { FossilDetailsComponent } from './fossil/fossil-details/fossil-details.component';
import { ExploreFossilsComponent } from './fossil/explore-fossils/explore-fossils.component';
import { NotFoundComponent } from './util/not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { SinginComponent } from './user/singin/singin.component';
import { WelcomeComponent } from './util/welcome/welcome.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginActivateGuard } from './guards/login-activate.guard';
import { ProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [LoginActivateGuard],
  },
  { path: 'welcome', component: WelcomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'explore/:page/:sortby', component: ExploreFossilsComponent },
  { path: 'explore', redirectTo: 'explore/1/id', pathMatch: 'full' },
  { path: 'fossil/:id', component: FossilDetailsComponent },
  { path: 'new', component: CreateFossilComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginActivateGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SinginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
