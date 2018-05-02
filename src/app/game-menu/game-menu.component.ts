import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.css']
})
export class GameMenuComponent implements OnInit {
  // https://medium.com/dailyjs/3-ways-to-communicate-between-angular-components-a1e3f3304ecb
  @Output() gameState: EventEmitter<null> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onGameControl(gameState: string) {
    console.log('Game Menu: onGameControl gameState', gameState);
  }

}
