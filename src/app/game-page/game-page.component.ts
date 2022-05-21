import { Component, ElementRef, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  numberOfCards: number = 10;

  deckSize: number | any = 4;
  board: { cardNumbers: number[]; cardStates: boolean[] } = {
    cardNumbers: [],
    cardStates: [],
  };
  currentTries: number = 0;
  best: number = 0;
  gameWon: boolean = false;
  
  firstCardIndex: number = 0;
  secondCardIndex: number = 0;
  firstFlip: boolean = true;


  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    if (this.gameService.deckSize) {
      this.deckSize = this.gameService.deckSize;
    }
    if (this.deckSize) {
      this.initializeBoard();
    }
  }



  initializeBoard() {
    for (let i = 1; i <= this.deckSize; i++) {
      this.board.cardNumbers.push(i, i);
    }
    for (let i = 1; i <= this.deckSize; i++) {
      this.board.cardStates.push(false, false);
    }

    this.shuffleArray(this.board.cardNumbers);
    console.log(this.board.cardNumbers);
  }

  shuffleArray(arr: number[]) {
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  }

  flipCard(cardIndex: number) {
    if (this.firstFlip) {
      this.firstFlip = false;
      this.firstCardIndex = cardIndex;
      this.board.cardStates[cardIndex] = true;
    } else {
      this.currentTries++;
      this.firstFlip = true;
      this.secondCardIndex = cardIndex;
      this.board.cardStates[cardIndex] = true;

      if (
        this.board.cardNumbers[this.firstCardIndex] !==
        this.board.cardNumbers[this.secondCardIndex]
      ) {
        setTimeout(() => {
          this.board.cardStates[this.firstCardIndex] = false;
          this.board.cardStates[this.secondCardIndex] = false;
        }, 1200);
      }

      if (
        this.board.cardNumbers[this.firstCardIndex] ===
        this.board.cardNumbers[this.secondCardIndex]
      ) {
        this.best++;
        if (this.isWinCondition()){
          this.gameWon = true;
        }
      }
    }
  }

  isWinCondition(){
    return !this.board.cardStates.some(flippedState => flippedState === false)
  }

  setDeckSize(size:number){
    this.deckSize = size;
  }

  restartGame() {
    this.currentTries = 0;
    this.firstFlip = true;
    this.best = 0;
    this.gameWon = false;
    this.board = { cardNumbers: [], cardStates: [] };
    this.initializeBoard();
  }
}
