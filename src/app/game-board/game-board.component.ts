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
  private _tickInterval = 100;
  private _tickTimer = null;
  private _queue = [];
  private _history = [];

  @Input()
  set gameState(value: string) {
    this._gameState = value;
    // console.log('[GameBoard set gameState]', this._gameState);
  }

  @Input()
  set boardBounds(value: {[key: string]: number}) {
    this._boardBounds = value;
    // console.log('[GameBoard set boardBounds]', this._boardBounds);

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
        this.clearGame();
      break;
    }
    // console.log('[GameBoard OnChanges]');
  }

  ngDoCheck() {
    // console.log('[GameBoard ngDoCheck] checking boardBounds differ');
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
    // console.log('[GameBoard setup Gameboard]', this._gameboard);
  }

  startGame() {
    // console.log('[GameBoard] starting game...');
    this._tickTimer = setInterval(() => {
      this.advanceTick();
    }, this._tickInterval);
  }

  pauseGame() {
    // console.log('[GameBoard] pausing game...');
    window.clearInterval(this._tickTimer);
  }

  clearGame() {
    console.log('[GameBoard] clearing and pausing game...');
    this._tick = 0;
    this._queue = [];
    this._history = [];

    this._cellsArray.forEach((cell) => {
      cell.alive = false;
    });

    this.pauseGame();
  }

  advanceTick() {

    this.resolveQueue();

    const yLength = this._gameboard.length;

    for (let y = 0; y < yLength; y++) {
      const xLength = this._gameboard[y].length;
      for (let x = 0; x < xLength; x++) {
        const cell = this.findCell(y, x);
        const aliveNeighbors = this.findNeighbors(y, x, yLength - 1, xLength - 1, true);
        const neighborCount = aliveNeighbors.length;
        let action = '';
        let reason = '';

        if (neighborCount <= 1 && cell.alive) {
          action = 'DEATH';
          reason = 'Loneliness';
        }
        if (neighborCount <= 1 && !cell.alive) {
          action = 'VACANT';
          reason = 'Low Population';
        }
        if (neighborCount === 2) {
          action = 'STABLE';
          reason = 'Balanced Population';
        }
        if (neighborCount === 3 && cell.alive) {
          action = 'STABLE';
          reason = 'Optimal Population';
        }
        if (neighborCount === 3 && !cell.alive) {
          action = 'BIRTH';
          reason = 'Optimal Population';
        }
        if (neighborCount > 4) {
          action = 'DEATH';
          reason = 'Overcrowding';
        }
        this.queueAction({ y, x, action, reason });
      }
    }

    this._tick++;
    console.log('tick', this._tick);
  }

  findCell(y: number, x: number) {
    return this._cellsArray.filter((cell, i, arr) => {
      return cell.y === y && cell.x === x;
    })[0];
  }

  findNeighbors(y: number, x: number, yMax: number, xMax: number, living: boolean) {
    // Boundary wrapping
    const yMinus = (y - 1) >= 0 ? y - 1 : yMax;
    const yPlus = (y + 1) <= yMax ? y + 1 : 0;
    const xMinus = (x - 1) >= 0 ? x - 1 : xMax;
    const xPlus = (x + 1) <= xMax ? x + 1 : 0;

    // All the neighbors that need to be found
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

    const neighbors = this._cellsArray.reduce((acc, cell, i, arr) => {
      let matchingIndex = -1;

      for (let j = 0; j < neighborCoords.length; j++) {
        const coord = neighborCoords[j];

        // break if checking cell against itself
        if (y === cell.y && x === cell.x) {
          break;
        }

        if (cell.y === coord.y && cell.x === coord.x && ((living && cell.alive) || !living) ) {
          acc.push(cell);
          matchingIndex = j;
          break;
        }

      }

      // Shorten the search since we've found a neighbor
      if (matchingIndex > 0) {
        neighborCoords.splice(matchingIndex, 1);
      }

      return acc;
    }, []);

    return neighbors;
  }

  resolveQueue() {
    // console.log('[GameBoard] ResolveQueue', this._queue);
    if (this._queue.length <= 0) {
      return;
    }
    for (let i = 0; i < this._queue.length; i++) {
      const action = this._queue[i];
      const cell = this.findCell(action.y, action.x);
      switch (action.action) {
        case 'BIRTH':
          cell.alive = true;
        break;

        case 'DEATH':
          cell.alive = false;
        break;
      }
    }
    this._history.push(this._queue);
    this._queue = [];
  }

  queueAction(action: { y: number, x: number, action: string, reason: string }) {
    this._queue.push(action);
  }
}
