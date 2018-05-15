import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {
  boardBounds = {
    height: 3,
    width: 3
  };

  @Output() updateBoardBounds: EventEmitter<any> = new EventEmitter();
  @Output() updateGameState: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.updateGameState.emit('pause');
    this.updateBoardBounds.emit(this.boardBounds);
  }

  changeGameState(gameState: string) {
    this.updateGameState.emit(gameState);
  }

  changeGameboard(key?: string, value?: string) {
    if (key && this.boardBounds[key] && value) {
      this.boardBounds[key] = parseInt(value, 10);
    }
    // Keep this outside the check so the Apply button click will still trigger an event emission
    this.updateBoardBounds.emit(this.boardBounds);
  }
}
