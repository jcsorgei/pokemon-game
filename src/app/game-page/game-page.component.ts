import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  numberOfCards: number = 10;

  deckSize: number | any = 4;
  cardsOnBoard: number[] = [];
  currentTries: number = 0;
  best: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.deckSize = this.gameService.deckSize;
    if (this.deckSize){
      console.log(this.deckSize);
      this.initializeBoard();
    }
  }

  initializeBoard(){
    for (let i=1;i<=this.deckSize;i++) {
      this.cardsOnBoard.push(i,i);
    }

    this.shuffleArray(this.cardsOnBoard);
    console.log(this.cardsOnBoard);
  }

  shuffleArray(arr: number[]){
    arr.sort(() => (Math.random() > .5) ? 1 : -1);
  }

}
