import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit, OnChanges {

  _boardBounds: any;
  @Input() gameState: string;

  @Input('boardBounds')
  get boardBounds(): any {
    return this._boardBounds;
  }
  // Need to use a setter when passing an entire object

  set boardBounds(value: any) {
    this._boardBounds = value;
    console.log('[GameController set BoardBounds] this._boardBounds', this._boardBounds);
  }

  constructor() {}

  ngOnInit() {}

  // ngOnChanges will fire when a primative data type is changed: string, number, boolean.
  // a change in gameState will cause this hook to fire
  // a change in boardBounds will not
  ngOnChanges() {
    console.log('[GameController OnChanges] this.gameState', this.gameState);
    // console.log('[GameController OnChanges] this.boardBounds', this.boardBounds);
  }

}
