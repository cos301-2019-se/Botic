import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { botResponse } from '../botResponse';
import { StateService } from '../state.service';

@Component({
  selector: 'app-response-ai',
  templateUrl: './response-ai.component.html',
  styleUrls: ['./response-ai.component.css']
})
export class ResponseAIComponent implements OnInit {

  constructor(public messageService: MessageService,
    public stateService: StateService) { }

  ngOnInit() {
  }

  displayChat(): string{
    var output = "";
    for (var i = 0; i < this.messageService.messages.length; i++){
      output += this.messageService.messages[i];
    }
    return output;
  }

  changeState(input: string){
    this.stateService.currentState = input;
  }
}
