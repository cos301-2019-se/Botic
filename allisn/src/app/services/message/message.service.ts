import { Injectable } from '@angular/core';
import { BotService } from '../../bot.service';
import { StateService } from '../../state.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: string[] = [];

  constructor(private BotService: BotService,
    private stateService: StateService) { 
  }

  public add(message: string) {
    this.messages.push(message);
  }

  botAdd(userMessage: string){
    this.BotService.getBotResponse(userMessage).subscribe(response =>{
        switch(response.code){
          case 1111:
            this.add(this.botMarkup(response.message));
          break;

          case 2222:
            if (this.checkState() != "BEFUDDLED"){
              if (this.checkState() != "CONFUSED"){
                this.add(this.botMarkup("I'm sorry. I didn't quite catch that. Could you maybe rephrase the question? Or send the world HELP for assistance."));
                this.changeState("CONFUSED");
              } else {
                this.add(this.botMarkup("I'm sorry. I still don't understand. Could you maybe rephrase the question again?"));
                this.changeState("BEFUDDLED");
              }
            } else {
              this.add(this.botMarkup("I cannot determine the correct repsonse, if you would like to send a support ticket, please send the word 'HUMAN'"));
            }


          break;
        };
        console.log("CURRENT STATE: " + this.checkState());
    });

  }

  userAdd(message: string) {
    if ((this.checkState() == "BEFUDDLED") && (message == "HUMAN"))
      this.changeState("SENDTICKET");
    else{
      this.add(this.userMarkup(message));
      this.botAdd(message);
    }

  }

  userMarkup(input: string): string {
    var response = '';
    response +='<li class="left clearfix">';
    response +='  <span class="chat-img pull-left">';
    response +='    <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />';
    response +='  </span>'
    response +='  <div class="chat-body clearfix">';
    response +='    <div class="header">'
    response +='      <strong class="primary-font" style="padding-left: 10px">You</strong>';
    response +='    </div>';
    response +='    <p style="padding-left: 57px">&nbsp;'+input+'</p>';
    response +='  </div>';
    response +='</li>';
    response +='<hr />';

    return response;
  }

  botMarkup(input: string): string{
    var response ='';
    response += '<li class="right clearfix">';
    response += ' <span class="chat-img pull-right">';
    response += '   <img src="./assets/Logo2.png" alt="User Avatar" style="width:50px;height:50px;background-color:#F1C40F;padding:3px;" class="img-circle" />';
    response += ' </span>';
    response += ' <div class="chat-body clearfix">';
    response += '   <div class="header">';
    response += '     <strong class="pull-right primary-font" style="padding-right: 10px">Allisn</strong>';
    response += '   </div>';
    response += '  <p>'+input+'</p>';
    response +='  </div>';
    response += '</li>';
    response +='<hr />';

    return response;
  }

  clear() {
    this.messages = [];
  }

  changeState(input: string){
    this.stateService.currentState = input;
  }

  checkState(): string{
    return this.stateService.currentState;
  }
}
