import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {
  @Input()
  boardBounds: {
    height: 0,
    width: 0
  };

  gameboard = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('bounds', this.boardBounds);
    const gameboard = [];
    for (let y = 0; y < this.boardBounds.height; y++) {
      const row = [];
      for (let x = 0; x < this.boardBounds.width; x++) {
        row.push(x);
      }
      gameboard.push(row);
    }
    this.gameboard = gameboard;
    console.log('gameboard', this.gameboard);
  }
}
