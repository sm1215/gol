import { Component, OnInit, Output } from '@angular/core';

const BOUNDS = { height: 20, width: 20 };

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit {
  @Output() boardBounds = BOUNDS;
  constructor() {

  }

  ngOnInit() {

  }

}
