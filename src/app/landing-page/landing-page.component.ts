import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '../_services/game.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  @Output() deckSizeChanged = new EventEmitter<number>();
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  setDeckSize(size:number){
    this.gameService.deckSizeChanged.emit(size);
  }

}
