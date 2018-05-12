import { Component, OnInit, onChange, Input, Output } from '@angular/core';

const BOUNDS = { height: 20, width: 20 };

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit, onChange {

  @Input() updateBoardBounds;

  @Output() boardBounds = this.updateBoardBounds || BOUNDS;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChange() {
    console.log('[GameController] this.boardBounds', this.boardBounds);
  }

}
