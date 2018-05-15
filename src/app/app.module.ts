import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { CellComponent } from './game-board/cell/cell.component';


@NgModule({
  declarations: [
    AppComponent,
    GameMenuComponent,
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
