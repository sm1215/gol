import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gameState: string;

  onGameState(gameState: string) {
    this.gameState = gameState;
    console.log('updatedGameState ', gameState);
  }
}
