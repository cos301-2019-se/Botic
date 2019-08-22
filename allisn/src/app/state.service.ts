import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  currentState = "NOMINAL";
  constructor() { }
}
