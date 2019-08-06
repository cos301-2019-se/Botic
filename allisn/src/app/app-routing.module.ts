import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './components/pages/landing/landing.component';
import { CustomerChatComponent } from './components/pages/customer-chat/customer-chat.component';
import { CustomerSupportComponent } from './components/pages/customer-support/customer-support.component';
import { AuthGuard } from './services/security/auth/auth.guard';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'chat', component: CustomerChatComponent },
  { path: 'repHome', component: CustomerSupportComponent},
  { path: 'admin', component: AdminDashboardComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
