import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './components/pages/landing/landing.component';
import { CustomerChatComponent } from './components/customer-chat/customer-chat.component';
import { AuthGuard } from './services/security/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'chat', component: CustomerChatComponent }
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
