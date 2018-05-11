import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {
  @Input()
  bounds = {
    height: 0,
    width: 0
  };

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('bounds', this.bounds);
  }

}
