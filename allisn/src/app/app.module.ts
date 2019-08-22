import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TextScraperComponent } from './text-scraper/text-scraper.component';

import { SafePipe } from './safe.pipe';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { BotChatComponent } from './bot-chat/bot-chat.component';
import { ChatHeadingComponent } from './chat-heading/chat-heading.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerChatComponent } from './components/customer-chat/customer-chat.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MessagesComponent } from './messages/messages.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ResponseAIComponent } from './response-ai/response-ai.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
    AdminDashboardComponent,
    ResponseAIComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextInputHighlightModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
