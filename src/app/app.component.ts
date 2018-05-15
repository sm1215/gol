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
    console.log('[App] updatedGameState ', gameState);
  }

  onGameboard(arg: any) {
    console.log('[App] onGameboard', arg);
  }

  onBoardBounds($event: string) {
    console.log('[App] boardBounds', $event);
  }
}
