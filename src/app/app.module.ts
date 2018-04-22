import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameControllerComponent } from './game-controller/game-controller.component';
import { GameBoardComponent } from './game-controller/game-board/game-board.component';
import { CellComponent } from './game-controller/game-board/cell/cell.component';


@NgModule({
  declarations: [
    AppComponent,
    GameMenuComponent,
    GameControllerComponent,
    GameBoardComponent,
    CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
