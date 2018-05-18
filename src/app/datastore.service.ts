import { Injectable } from '@angular/core';

@Injectable()
export class DatastoreService {

  constructor() { }

  saveGame(data: object[]) {
    console.log('[DatastoreService Save Game]', data);

    const stringified = JSON.stringify(data);
    localStorage.setItem('GoL', stringified);
  }

  loadGame() {
    const stringified = localStorage.getItem('GoL');
    const data = JSON.parse(stringified);
    return data;
  }

}
