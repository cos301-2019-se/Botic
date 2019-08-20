import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TextScraperComponent } from './components/text-scraper/text-scraper.component';
import { SafePipe } from './safe.pipe';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { BotChatComponent } from './components/bot-chat/bot-chat.component';
import { ChatHeadingComponent } from './components/chat-heading/chat-heading.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerChatComponent } from './components/pages/customer-chat/customer-chat.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MessagesComponent } from './components/messages/messages.component';
import { CustomerSupportComponent } from './components/pages/customer-support/customer-support.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { SecureInterceptorService } from './services/security/auth/secure-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TextScraperComponent,
    SafePipe,
    BotChatComponent,
    ChatHeadingComponent,
    LandingComponent,
    CustomerChatComponent,
    HeaderComponent,
    FooterComponent,
    MessagesComponent,
    CustomerSupportComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextInputHighlightModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: SecureInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
