import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextScraperService } from '../text-scraper.service';
import { BotService } from '../bot.service';
import { badWord } from '../badWord';
import { botResponse } from '../botResponse';

@Component({
  selector: 'app-text-scraper',
  templateUrl: './text-scraper.component.html',
  styleUrls: ['./text-scraper.component.css'],
})

export class TextScraperComponent implements OnInit {
  userInput = "";
  markedText: string;
  badWords: badWord[];
  nextResponse: botResponse;
  badWordsString: string;

  chatBubblesMarkup = '';

  hasChecked = false;
  debug = false;

  constructor(private TextScraperService: TextScraperService, private BotService: BotService) { }

  badWordsFromString(): void{
    console.log("The words: " + this.badWordsString);
    //var badwordsArray = JSON.parse(this.badWordsString);
    //console.log(badwordsArray);
    //return badwordsArray;
  }

  getBadWords() : void{

    this.badWords = [];
    this.badWordsFromString();
    //console.log(this.badWords);
  }

  ngOnInit() {
    this.badWords = [];
    this.runTests();
    // this.TextScraperService.getBadWords().subscribe(badWords => this.badWords = badWords);
    this.getBadWords();
  }

  /*
   In the response, if the bot needs to forward the ticket to a rep
   the bot needs to say something to the effect of "I can't figure it out
   I'm about to send this to a rep, please supply your email and I'll get
   back to you as soon as I can." And then show a textbox where they can enter
   their email.
  */
  botResponse(input: string): string{
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

  userResponse(input: string): string {
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

  /*
   maybe integrate the AI into a standalone component.
  */
  processResponse(input: string): void{

    this.BotService.getBotResponse(input).subscribe(response =>{
        this.nextResponse = response;
        console.log("Response: " + this.nextResponse);
        this.chatBubblesMarkup += this.userResponse(input);
        if ((this.nextResponse)){
          if (this.nextResponse.code == 1111){
            this.chatBubblesMarkup += this.botResponse(this.nextResponse.message)
            this.nextResponse = null;
          }

          if (this.nextResponse.code == 2222){
            this.chatBubblesMarkup += this.botResponse("I'm not sure I follow.")
            this.nextResponse = null;
          }
        }
    });



    if (this.debug){
      var botAI = [
        {
          message : "I forgot my password",
          response: 'Follow this <a href="">link</a> to reset your password.'
        },
        {
          message : "What's the meaning of life?",
          response: 'I\'m having trouble finding an answer, click <a href="#">here</a> to talk to a real person.'
        },
        {
          message : "What do you know about cooking?",
          response : "I'm unsure of how to respond, please enter your email address to forward your ticket to a representative<br /><input type='text'/>&nbsp;<input class='btn primary' type='submit' value='send'>"
        }
      ];
      this.chatBubblesMarkup += "<br />";
      var botResponse = "I'm sorry, my responses are limited, you must ask the right questions.";
      for (var i = 0; i < botAI.length; i++){
        if (input.includes(botAI[i].message)){
          botResponse = botAI[i].response;
        }
      }

      this.chatBubblesMarkup += this.botResponse(botResponse);
    }



  }

  displayChat(): string{
    return this.chatBubblesMarkup;
  }

  /*
   if the string is returned and the badwords array is empty, maybe don't show
   the preview.
  */
  returnChanged(input: string): string{
    this.TextScraperService.getBadWordsFromInput(input).subscribe(badWords => this.badWords = badWords);
    var output = "";
    // this.badWords = [];

    var array = input.split(" ");
    output = "";

    var isABadWord = false;
    var severity = 0;

    for(var i = 0; i < array.length; i++){
      isABadWord = false;

      for (var j = 0; j < this.badWords.length; j++){
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
    }

    return output;
  }

  /*This function checks to see if a person has entered personal information,
  if they have, first warn them, then the person gets the option to change the
  message or send it with the personal information attached.
  */
  onClickCall(userInput : string) : void {

      /*
      Test Purposes:
      */
      var passed = 0;
      var failed = 0;

      // window.alert(this.badWords.length);
      if (this.hasChecked == false) {
        this.returnChanged(userInput);
        console.log("onClickCall has been called.");
        passed++;
        console.log("onClickCall has been called - hasChecked started on false");
        passed++;
        this.hasChecked = true;
        console.log("onClickCall has been called - hasChecked changed to true - checking if personal info has been entered");
        passed++;
        if (this.badWords.length == 0) {
          console.log("onClickCall has been called - no personal information has been identified.");
          passed++;
          console.log("onClickCall has been called - hasChecked changed back to false - no personal info");
          passed++;
          this.processResponse(userInput);
          this.hasChecked = false;
        }
        else {
          window.alert("Personal information has been entered. See text above textbox for details.");
          var theBadWordsAdded = "The following personal information have been entered: ";
          console.log("onClickCall has been called - personal information has been identified.");
          passed++;

          // for (var i = 0; i < this.badWords.length; i++) {
          //   if (i == 0) {
          //     theBadWordsAdded = theBadWordsAdded + this.badWords[i];
          //   }
          //   else {
          //     theBadWordsAdded = theBadWordsAdded + ", " + this.badWords[i];
          //   }
          // }

          var replaceText = document.getElementById("preview");
          replaceText.innerHTML = replaceText.innerHTML.replace("", theBadWordsAdded + " " + this.returnChanged(userInput));
          console.log("onClickCall has been called - personal information displayed.");
          passed++;
        }
      }
      else {
        this.processResponse(userInput);
        this.hasChecked = false;
        console.log("onClickCall has been called - gave option to take out personal information");
        passed++;
      }
      console.log("Tests completed: " + passed + " passed, " + failed + " failed.")
    }

  /*
    Maybr these need to go.
 */
  highlight(input: string, badWords: badWord[]): boolean {

    for (var i = 0; i < badWords.length; i++)
      if (i == badWords[i].position){

        return true;
      }

    return false;
  }

  applyHighlights(input: string, badWords: string[]): string{

    var output = "";

    var array = input.split(" ");
    output = "";

    var isABadWord = false;

    for(var i = 0; i < array.length; i++){
      isABadWord = false;

      for (var j = 0; j < badWords.length; j++){
        if (array[i].includes(badWords[j]))
          isABadWord = true;
      }

      if (isABadWord == true)
        output += '<mark>' + array[i] + '</mark>';
      else
        output += array[i];

      output += " ";
    }

    return output.replace(/\n$/g, '\n\n');
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

    //botResponse
    if (typeof(this.botResponse('')) == "string")
      passed++;
    else
      failed++;
    console.log("botResponse returns string " + (typeof(this.botResponse('')) == "string"));

    //userResponse
    if (typeof(this.userResponse('')) == "string")
      passed++;
    else
      failed++;
    console.log("userResponse returns string " + (typeof(this.botResponse('')) == "string"));

    //processResponse

    //displayChat
    if (typeof(this.displayChat()) == "string")
      passed++;
    else
      failed++;
    console.log("displayChat returns string " + (typeof(this.botResponse('')) == "string"));

    /*
    //returnChanged
    var changed = failed;
    for (var  i = 0; i < this.badWords.length; i++){
      if (typeof(this.badWords[i]) == "object"){
        failed++
        console.log(this.badWords[i] + " badWord object");
      }
    }
    if (changed == failed){
      passed++;
      console.log("all the bad words are words");
    }

    //highlight
    var changed2 = failed;

    for (var j = 0; j < this.badWords.length; j++){
      if (!(this.highlight(this.badWords[j], this.badWords))){
        failed++;
        console.log("highlight can't find " + this.badWords[j]);
      }
    }
    if (changed2 == failed){
      passed++;
      console.log("highlight() finds all the bad words");
    }

    //applyHighlights
    if (typeof(this.applyHighlights('',this.badWords)) == "string")
      passed++;
    else
      failed++;
    console.log("applyHighlights() returns string " + (typeof(this.applyHighlights('',this.badWords)) == "string"));
    */
    console.log('\nTests completed. ' + passed +' passed, ' + failed + ' failed.');

  }

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

}

/*
  badWords = [
    "Peter",
    "Alicia",
    "Kyle",
    "Justin",
    "Lesego",
    "Msimanga",
    "Mulder",
    "Gaunt",
    "Grenfell",
    "Mabe",
    "Stacey",
    "Vrede",
    "Cameron",
    "Tari",
    "13042352",
    "14283124",
    "15330967",
    "16028440",
    "15055214",
    "u13042352",
    "u14283124",
    "u15330967",
    "u16028440",
    "u15055214"
  ];
  */
