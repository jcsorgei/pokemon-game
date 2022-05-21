import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  @Output() deckSizeChanged = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  setDeckSize(size:number){
    this.deckSizeChanged.emit(size);
  }

}
