import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-text-scraper',
  templateUrl: './text-scraper.component.html',
  styleUrls: ['./text-scraper.component.css'],
})

export class TextScraperComponent implements OnInit {
  userInput = "";
  markedText: string;

  chatBubblesMarkup = '';

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

  constructor() { }

  ngOnInit() {
    this.runTests();
  }



  botResponse(input: string): string{
    var response ='';

    response += '<span class="chat-img pull-right">';
    response += '<img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />';
    response += '</span>';

    response += '<div class="chat-body clearfix">';
    response += '<div class="header">';

    response += '<strong class="pull-right primary-font">Bhaumik Patel</strong>';
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
    response +='<strong class="primary-font">Jack Sparrow</strong>';
    response +='</div>';
    response +='<p>&nbsp;'+input+'</p>';
    response +='</div>';
    response +='<br />';

    return response;
  }

  processResponse(input: string): void{
    var botAI = [
      {
        message : "I forgot my password",
        response: 'Follow this <a href="">link</a> to reset your password.'
      }
    ]

    this.chatBubblesMarkup += this.userResponse(input);


    this.chatBubblesMarkup += "<br />";
    var found = false;
    var i = 0;
    var botResponse = "I'm sorry, my responses are limited, you must ask the right questions.";

    while ((found == false) && (i < botAI.length)){
      if (input.includes(botAI[i].message)){
        found = true;
        botResponse = botAI[i].response;
      }
    }
    this.chatBubblesMarkup += this.botResponse(botResponse);
  }

  displayChat(): string{
    return this.chatBubblesMarkup;
  }

  returnChanged(input: string, badWords: string[]): string{

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
        output += '<span style="color:red;">' + array[i] + '</span>';
      else
        output += array[i];

      output += " ";
    }

    return output;
  }

  highlight(input: string, badWords: string[]): boolean {

    for (var i = 0; i < badWords.length; i++)
      if (input.includes(badWords[i])){

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


    //returnChanged
    var changed = failed;
    for (var  i = 0; i < this.badWords.length; i++){
      if (typeof(this.badWords[i]) == "number"){
        failed++
        console.log(this.badWords[i] + " is not a string");
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

    console.log('\nTests completed. ' + passed +' passed, ' + failed + ' failed.');
  }

}
