import { Component, OnInit, OnChanges, Input, Output } from '@angular/core';

const BOUNDS = { height: 20, width: 20 };

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit, OnChanges {

  @Input() updateBoardBounds;

  @Output() boardBounds = this.updateBoardBounds || BOUNDS;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('[GameController] this.boardBounds', this.boardBounds);
  }

}
