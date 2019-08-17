import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/security/auth/auth.service';
import { LandingComponent } from './components/pages/landing/landing.component';
import { CustomerChatComponent } from './components/pages/customer-chat/customer-chat.component';
import { CustomerSupportComponent } from './components/pages/customer-support/customer-support.component';
import { AuthGuard } from './services/security/auth/auth.guard';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'chat', component: CustomerChatComponent, canActivate: [AuthGuard] },
  { path: 'repHome', component: CustomerSupportComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
