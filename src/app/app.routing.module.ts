import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
  { path: 'summary', component: SummaryComponent , canActivate: [AuthGuard]},
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
    // otherwise redirect to home
  { path: '**', redirectTo: '' },
  { path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}