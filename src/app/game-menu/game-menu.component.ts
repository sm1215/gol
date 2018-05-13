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

  @Output() updateBoardBounds: EventEmitter<any> = new EventEmitter();
  @Output() gameState: EventEmitter<string> = new EventEmitter();

  constructor() {
    console.log('[GameMenu] this.boardBounds', this.boardBounds);
  }

  ngOnInit() {
  }

  changeGameState(_gameState: string) {
    this.gameState.emit(_gameState);
  }

  changeGameboard(key?: string, value?: string) {
    if (key && value) {
      this.boardBounds[key] = parseInt(value, 10);
    }
    this.updateBoardBounds.emit(this.boardBounds);
    console.log('[GameMenu] this.boardBoards', this.boardBounds);
  }

  // The boardBounds inputs still need some work
  // need to bind an event and then pull values from a template reference variable
  // which is a different method than using e.target.value
  // https://angular.io/guide/user-input#get-user-input-from-a-template-reference-variable
}
