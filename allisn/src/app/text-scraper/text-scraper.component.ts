import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-scraper',
  templateUrl: './text-scraper.component.html',
  styleUrls: ['./text-scraper.component.css']
})
export class TextScraperComponent implements OnInit {
  userInput = "My name is Peter";

  badWords = [
    "Peter",
    "IsecretlyLove50cent",
    "MissesPaws",
    "12544658795563"
  ];

  constructor() { }

  ngOnInit() {
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

}
