import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  deckSizeChanged = new EventEmitter<number>();
  deckSize: number | unknown;
  constructor() { 
    this.deckSizeChanged.subscribe((size:number)=>{
      this.deckSize = size;
    })
  }
}
