import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-text-scraper',
  templateUrl: './text-scraper.component.html',
  styleUrls: ['./text-scraper.component.css'],
})

export class TextScraperComponent implements OnInit {
  userInput = "";
  markedText: string;

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


}
