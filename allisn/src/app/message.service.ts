import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: string[] = [];

  constructor() { }

  public add(message: string) {
    this.messages.push(message);
  }

  public clear() {
    this.messages = [];
  }
}
