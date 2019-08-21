import { Injectable } from '@angular/core';
import { BotService } from './bot.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor(private BotService: BotService) { }

  add(message: string) {
    this.messages.push(message);
  }

  botAdd(userMessage: string){
    this.BotService.getBotResponse(userMessage).subscribe(response =>{
        switch(response.code){
          case 1111:
            this.add(this.botMarkup(response.message));
          break;

          case 2222:
            this.add(this.botMarkup(response.message));
          break;
        };
    });
  }

  userAdd(message: string) {
    this.add(this.userMarkup(message));
    this.botAdd(message);
  }

  userMarkup(input: string): string {
    var response = '';
    response +='<span class="chat-img pull-left">';
    response +='   <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />';
    response +='</span>'
    response +='<div class="chat-body clearfix">';
    response +='<div class="header">'
    response +='<strong class="primary-font">You</strong>';
    response +='</div>';
    response +='<p>&nbsp;'+input+'</p>';
    response +='</div>';
    response +='<br />';

    return response;
  }

  botMarkup(input: string): string{
    var response ='';

    response += '<span class="chat-img pull-right">';
    response += '<img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />';
    response += '</span>';

    response += '<div class="chat-body clearfix">';
    response += '<div class="header">';

    response += '<strong class="pull-right primary-font">Allisn</strong>';
    response += '</div>';
    response += '<p>'+input+'</p>';
    response += '</div>';

    return response;
  }

  clear() {
    this.messages = [];
  }
}