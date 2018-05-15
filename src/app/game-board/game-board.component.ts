import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {
  _gameState: string;
  _boardBounds: any = {
    height: 0,
    width: 0
  };

  @Input()
  set gameState(value: string) {
    this._gameState = value;
    console.log('[GameBoard set gameState]', this._gameState);
  }

  @Input()
  set boardBounds(value: any) {
    this._boardBounds = value;
    console.log('[GameBoard set boardBounds]', this._boardBounds);
  }

  gameboard = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.setupGameboard();
    console.log('[GameBoard OnChanges] setting up gameboard');
  }

  setupGameboard() {
    const gameboard = [];
    for (let y = 0; y < this._boardBounds.height; y++) {
      const row = [];
      for (let x = 0; x < this._boardBounds.width; x++) {
        row.push(x);
      }
      gameboard.push(row);
    }
    this.gameboard = gameboard;
  }
}
