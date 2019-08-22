import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextScraperService } from '../text-scraper.service';
import { MessageService } from '../message.service';
import { badWord } from '../badWord';
import { ToastrService } from 'ngx-toastr';
import { StateService } from '../state.service';
import { NgForm } from '@angular/forms';
import { SendTicketService } from '../send-ticket.service';

@Component({
  selector: 'app-text-scraper',
  templateUrl: './text-scraper.component.html',
  styleUrls: ['./text-scraper.component.css'],
})

export class TextScraperComponent implements OnInit {
  userInput = "";
  markedText: string;
  badWords: badWord[];
  hasChecked = false;
  debug = false;
  preview = "preview";

  email: string;
  subject: string;
  body: string;

  constructor(
    private TextScraperService: TextScraperService,
    public MessageService: MessageService,
    private toastr: ToastrService,
    private state: StateService,
    private sendTicketService: SendTicketService,
  ) {}

  ngOnInit() {
    this.badWords = [];
    this.runTests();
    this.state.currentState = 'NOMINAL';
    // this.TextScraperService.getBadWords().subscribe(badWords => this.badWords = badWords);
  }

  returnChangedDisplay(input: string): void{
    var output = "";
    //this.TextScraperService.getBadWordsFromInput(input).subscribe(badWords => {

        var array = input.split(" ");
        var isABadWord = false;
        var severity = 0;

        //this.badWords = badWords;

        for(var i = 0; i < array.length; i++){
          //Reset isABadWord and severity index.
          isABadWord = false;
          severity = 0;

          for(var j = 0; j < this.badWords.length; j++){
            if (i == this.badWords[j].position){
              isABadWord = true;
              severity = this.badWords[j].severity;
            }
          }

          if (isABadWord == true)
            output += '<span style="color:'+this.getColor(severity)+';">' + array[i] + '</span>';
          else
            output += array[i];

          output += " ";
          this.preview = output;
        }
    //});
  }

  /**
  * This function checks if a password is being detected (so checking if the severity is 3).
  * If it is 3 then return true.
  * This would then be used in the function onClickCall to determine if the user
  * still has the option to send.  So if it returns true, the user would not be
  * allowed to send the ticket at all.
  */
  checkIfSeverityIsThree(input: string): boolean {
    // this.TextScraperService.getBadWordsFromInput(input).subscribe(badWords => {this.badWords = badWords;
      var array = input.split(" ");
      var severity = 0;

      for(var i = 0; i < array.length; i++){
        for (var j = 0; j < this.badWords.length; j++){
          if (i == this.badWords[j].position){
            severity = this.badWords[j].severity;
            if (severity == 3) return true;
          }
        }
      }
      return false;
    return false;
  }

  /*This function checks to see if a person has entered personal information,
  if they have, first warn them, then the person gets the option to change the
  message or send it with the personal information attached.
  */
  onClickCall(userInput : string) : void {
    this.TextScraperService.getBadWordsFromInput(userInput).subscribe(badWords => {
      this.badWords = badWords;
        if (this.hasChecked == false) {

          setTimeout(() => {

            this.hasChecked = true;

            if (this.badWords.length == 0) {
              this.sendMessage(userInput);
              this.userInput = "";
              this.hasChecked = false;
            }
            else {
              if (this.checkIfSeverityIsThree(userInput) == true) {
                this.showError();
                this.hasChecked = false;

                var replaceText = document.getElementById("preview");
                this.returnChangedDisplay(userInput);
              }
              else {
                this.showError();
                var replaceText = document.getElementById("preview");
                this.returnChangedDisplay(userInput);
              }
            }
          }, 2000);
        }
        else {
          this.sendMessage(userInput);
          this.hasChecked = false;
          this.userInput = "";
        }
      });
    }

 /*
 update the tests. refer to testing policy
 stuff to add to the testing policy:
  1. How to write a tests
  2. when to write a tests
  3. What outputs to test for
 */
  runTests(): void {

    var passed = 0;
    var failed = 0;
    /*
      TODO: Implement a new testing interface. Like, stat...
    */
    console.log('\nTests completed. ' + passed +' passed, ' + failed + ' failed.');

  }

  /*
    TODO: Match Severity Indexes with the propper colours.
  */
  getColor(severity: number): string {
    switch(severity){
      case 0:
        return 'fuchsia';
      case 1:
        return 'orange';
      break;
      case 2:
        return 'red';
      break;
    }
  }

  private sendMessage(message: string) {
    this.MessageService.userAdd(`${message}`);
  }

  showError() {
    this.toastr.error("Personal information has been entered", "Privacy Warning");
  }

  sendTicket(): boolean{
    return (this.state.currentState == 'SENDTICKET');
  }

  stateDone(): boolean{
    return (this.state.currentState == 'DONE');
  }

  resetState(){
    return (this.state.currentState == 'NOMINAL');
  }

  onSubmit(f: NgForm) {
    var ticket = f.value;
    console.log(ticket.email);  // { first: '', last: '' }
    console.log(ticket.subject);  // false
    console.log(ticket.body);

    this.sendTicketService.send(ticket.email, ticket.subject, ticket.body).subscribe(response =>{
      if (response.code =='SUCCESS'){
        this.state.currentState = 'DONE';
      }
    })
  }
}
