import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {
  @Input() boardBounds = {
    height: 20,
    width: 20
  };

  @Output() updateBoardBounds = new EventEmitter();
  @Output() gameState: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  changeGameState(_gameState: string) {
    this.gameState.emit(_gameState);
  }

  changeGameboard(key?: string, value?: string) {
    if (key && this.boardBounds[key] && value) {
      this.boardBounds[key] = parseInt(value, 10);
    }
    // Keep this outside the check so the Apply button click will still trigger an event emission
    this.updateBoardBounds.emit(this.boardBounds);
  }
}
