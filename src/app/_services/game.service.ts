import { EventEmitter, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  deckSizeChanged = new EventEmitter<number>();
  deckSize: number | unknown;

  currentBoardState = new ReplaySubject<{
    board: { cardNumbers: number[]; cardStates: boolean[] };
    currentTries: number;
    best: number;
    gameWon: boolean;
    firstCardIndex: number;
    secondCardIndex: number;
    firstFlip: boolean;
  } | null>(1);

  constructor() {
    this.deckSizeChanged.subscribe((size: number) => {
      this.deckSize = size;
    });
  }

  setCurrentBoardState(boardState: {
    board: { cardNumbers: number[]; cardStates: boolean[] };
    currentTries: number;
    best: number;
    gameWon: boolean;
    firstCardIndex: number;
    secondCardIndex: number;
    firstFlip: boolean;
  }) {
    localStorage.setItem('boardState', JSON.stringify(boardState));
    this.currentBoardState.next(boardState);
  }

  resetCurrentBoard() {
    localStorage.removeItem('boardState');
    this.currentBoardState.next(null);
  }
}
