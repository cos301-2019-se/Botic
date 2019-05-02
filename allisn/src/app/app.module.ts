import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TextScraperComponent } from './text-scraper/text-scraper.component';
import { SafePipe } from './safe.pipe';

import { TextInputHighlightModule } from 'angular-text-input-highlight';
import { BotChatComponent } from './bot-chat/bot-chat.component';
import { UserChatComponent } from './user-chat/user-chat.component';
import { ChatHeadingComponent } from './chat-heading/chat-heading.component';

@NgModule({
  declarations: [
    AppComponent,
    TextScraperComponent,
    SafePipe,
    BotChatComponent,
    UserChatComponent,
    ChatHeadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextInputHighlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
