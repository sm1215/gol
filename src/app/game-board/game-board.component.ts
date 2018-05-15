import { Component, OnInit, OnChanges, DoCheck, Input, KeyValueDiffer, KeyValueDiffers } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges, DoCheck {
  private _gameState: string;
  private _boardBounds: any = {
    height: 0,
    width: 0
  };
  private _differ: KeyValueDiffer<string, number>;
  private _gameboard = [];
  private _tick = 0;
  private _tickInterval = 3000;
  private _tickTimer = null;

  @Input()
  set gameState(value: string) {
    this._gameState = value;
    console.log('[GameBoard set gameState]', this._gameState);
  }

  @Input()
  set boardBounds(value: {[key: string]: number}) {
    this._boardBounds = value;
    console.log('[GameBoard set boardBounds]', this._boardBounds);

    if (!this._differ && value) {
      this._differ = this._differs.find(value).create();
    }
  }

  constructor(private _differs: KeyValueDiffers) {}
  ngOnInit() {}

  ngOnChanges() {
    switch (this._gameState) {
      case 'start':
        this.startGame();
      break;
      case 'pause':
        this.pauseGame();
      break;
      case 'clear':
      break;
    }
    console.log('[GameBoard OnChanges]');
  }

  ngDoCheck() {
    console.log('[GameBoard ngDoCheck] checking boardBounds differ');
    if (this._differ) {
      const changes = this._differ.diff(this._boardBounds);
      if (changes) {
        this.setupGameboard();
      }
    }
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
    this._gameboard = gameboard;
  }

  startGame() {
    console.log('[GameBoard] starting game...');
    this._tickTimer = setInterval(() => {
      this.advanceTick();
    }, this._tickInterval);
  }

  pauseGame() {
    console.log('[GameBoard] pausing game...');
    window.clearInterval(this._tickTimer);
  }

  advanceTick() {
    this._tick++;


    console.log('tick', this._tick);
  }
}
