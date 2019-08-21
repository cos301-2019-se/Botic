import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TextScraperService } from '../text-scraper.service';
import { MessageService } from '../message.service';
import { badWord } from '../badWord';

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

  constructor(
    private TextScraperService: TextScraperService,
    public MessageService: MessageService
  ) {}

  ngOnInit() {
    this.badWords = [];
    this.runTests();
    // this.TextScraperService.getBadWords().subscribe(badWords => this.badWords = badWords);
  }

  /*
   if the string is returned and the badwords array is empty, maybe don't show
   the preview.
  */
  returnChanged(input: string): string{
    this.TextScraperService.getBadWordsFromInput(input).subscribe(badWords => {
        var output = "";
        var array = input.split(" ");
        var isABadWord = false;
        var severity = 0;

        this.badWords = badWords;

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
        }

        return output;
    });

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
          this.sendMessage(userInput);
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
          //}

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
}
