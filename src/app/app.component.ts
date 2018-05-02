import { Component } from '@angular/core';

const GAMESTATE = [
  'PAUSED',
  'RUNNING',
  'END'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gameState = GAMESTATE[0];

  onGameState(newState: string) {
    switch (newState) {
      case 'pause':
        this.gameState = GAMESTATE[0];
      break;
      case 'start':
        this.gameState = GAMESTATE[1];
      break;
      case 'clear':
        this.gameState = GAMESTATE[0];
      break;
      case 'random':
        this.gameState = GAMESTATE[0];
      break;
      case 'end':
        this.gameState = GAMESTATE[2];
      break;
    }

    console.log('this.gameState', this.gameState);
  }
}
