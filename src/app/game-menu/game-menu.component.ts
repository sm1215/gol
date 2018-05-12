import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {
  @Output() gameState: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeGameState(_gameState: string) {
    this.gameState.emit(_gameState);
  }

  changeGameboard() {

  }

}
