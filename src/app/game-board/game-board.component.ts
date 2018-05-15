import {
  Component,
  OnInit,
  AfterViewInit,
  OnChanges,
  DoCheck,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  ViewChildren,
  QueryList
} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, AfterViewInit, OnChanges, DoCheck {
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

  @ViewChildren('cell') cells: QueryList<any>;
  private _cellsArray = [];

  constructor(private _differs: KeyValueDiffers) {}
  ngOnInit() {}

  ngAfterViewInit() {
    this._cellsArray = this.cells.toArray();
  }

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
    console.log('[GameBoard setup Gameboard]', this._gameboard);
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

  clearGame() {
    console.log('[GameBoard] clearing and pausing game...');
    this._tick = 0;
    this.pauseGame();
  }

  advanceTick() {
    this._tick++;
    const yLength = this._gameboard.length;

    for (let y = 0; y < yLength; y++) {
      const xLength = this._gameboard[y].length;
      for (let x = 0; x < xLength; x++) {
        this.findNeighbors(y, x, yLength - 1, xLength - 1);
      }
    }

    console.log('tick', this._tick);
  }

  // 8 neighbors total, wrap the grid boundaries
  // coord pairs for each neighbor
  // y-1, x-1
  // y-1, x,
  // y-1, x+1
  // y, x-1
  // y, x+1,
  // y+1, x-1,
  // y+1, x,
  // y+1, x+1
  findNeighbors(y, x, yMax, xMax) {
    let neighbors = [];

    // Boundary wrapping
    const yMinus = (y - 1) > 0 ? y - 1 : yMax;
    const yPlus = (y + 1) <= yMax ? y + 1 : 0;
    const xMinus = (x - 1) > 0 ? x - 1 : xMax;
    const xPlus = (x + 1) <= xMax ? x + 1 : 0;

    console.log('y', y);
    console.log('yMinus', yMinus);
    console.log('yPlus', yPlus);
    console.log('yMax', yMax);
    console.log('-----------------------------');
    console.log('x', x);
    console.log('xMinus', xMinus);
    console.log('xPlus', xPlus);
    console.log('xMax', xMax);

    // All the neighbors that need to be checked
    const neighborCoords = [
      { y: yMinus, x: xMinus },
      { y: yMinus, x: x },
      { y: yMinus, x: xPlus },
      { y: y, x: xMinus },
      { y: y, x: xPlus },
      { y: yPlus, x: xMinus },
      { y: yPlus, x: x },
      { y: yPlus, x: xPlus }
    ];

    neighbors = this._cellsArray.filter((cell) => {
      let coordMatch;
      neighborCoords.forEach((coord) => {
        const matches = cell.x === coord.x && cell.y === coord.y;
        if (matches) {
          coordMatch = coord;
        }
      });
      if (coordMatch) {
        return coordMatch;
      }
    });

    console.log('neighbors', neighbors);


  }
}
