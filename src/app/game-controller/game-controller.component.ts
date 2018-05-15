import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';

const BOUNDS = { height: 20, width: 20 };

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit, OnChanges {

  @Input() gameState: string;
  @Input() boardBounds: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log('[GameController OnChanges] this.gameState', this.gameState);
    console.log('[GameController OnChanges] this.boardBounds', this.boardBounds);
  }

}
