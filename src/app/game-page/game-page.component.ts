import { Component, ElementRef, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  numberOfCards: number = 10;

  deckSize: number | any = 4;
  board: {cardNumbers: number[]; cardStates: boolean[]} = {cardNumbers: [], cardStates: []};
  currentTries: number = 0;
  best: number = 0;

  firstCardIndex: number = 0;
  secondCardIndex: number = 0;
  firstFlip: boolean = true;

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
      this.board.cardNumbers.push(i,i);
    }
    for (let i=1;i<=this.deckSize;i++) {
      this.board.cardStates.push(false,false);
    }

    this.shuffleArray(this.board.cardNumbers);
    console.log(this.board.cardNumbers);
  }

  shuffleArray(arr: number[]){
    arr.sort(() => (Math.random() > .5) ? 1 : -1);
  }

  flipCard(cardIndex: number){
    console.log(this.firstFlip);
    console.log(this.board.cardNumbers[cardIndex])
    if (this.firstFlip){
      this.firstFlip = false;
      this.firstCardIndex = cardIndex;
      this.board.cardStates[cardIndex] = true;
    } else{
      console.log("lefut")
      this.firstFlip = true;
      this.secondCardIndex = cardIndex;
      this.board.cardStates[cardIndex] = true;

      if (this.board.cardNumbers[this.firstCardIndex] !== this.board.cardNumbers[this.secondCardIndex]){
        console.log("not equal")
        setTimeout(() => {
          this.board.cardStates[this.firstCardIndex] = false;
          this.board.cardStates[this.secondCardIndex] = false;
        }, 1200);
      }
    }



    

  }
}
