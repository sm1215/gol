import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  gameState: string;
  boardBounds: any;

  onGameState(gameState: string) {
    this.gameState = gameState;
    console.log('[App] updatedGameState ', gameState);
  }

  onBoardBounds(boardBounds: string) {
    this.boardBounds = boardBounds;
    console.log('[App] boardBounds', boardBounds);
  }
}
