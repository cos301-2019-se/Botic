import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TextScraperComponent } from './text-scraper/text-scraper.component';
import { SafePipe } from './safe.pipe';

import { TextInputHighlightModule } from 'angular-text-input-highlight';

@NgModule({
  declarations: [
    AppComponent,
    TextScraperComponent,
    SafePipe
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
