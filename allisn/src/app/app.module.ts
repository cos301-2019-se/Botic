import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TextScraperComponent } from './text-scraper/text-scraper.component';
import { SafePipe } from './safe.pipe';

import { HttpClientModule } from '@angular/common/http';

import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { BotChatComponent } from './bot-chat/bot-chat.component';
import { ChatHeadingComponent } from './chat-heading/chat-heading.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomerChatComponent } from './components/customer-chat/customer-chat.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MessagesComponent } from './messages/messages.component';

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
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextInputHighlightModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
