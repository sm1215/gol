import { Injectable } from '@angular/core';

const STORAGE_KEY = 'GoL';

@Injectable()

// TODO: Build some tests for this service
export class DatastoreService {

  constructor() { }

  // Don't want to overwrite everything, just append to it
  // use retrieveGoL first, it should return an array that can be added to
  saveGame(data: object[]) {
    const golData = this.retrieveGol();
    golData.push(data);
    this.storeGol(golData);
  }

  // Try to load a requested game or default to latest save
  loadGame(requestedIndex?: number) {
    const golData = this.retrieveGol();
    const gameIndex = requestedIndex ? requestedIndex : golData.length - 1;
    if (golData[gameIndex] !== undefined) {
      return golData[gameIndex];
    }
  }

  // The app should store everything under a single key
  // Need to stringify data first
  storeGol(data) {
    if (window.localStorage) {
      const stringified = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, stringified);
    } else {
      return false;
    }
  }

  // This handles retrieving that key and parsing the JSON
  retrieveGol() {
    if (window.localStorage) {
      const stringified = localStorage.getItem(STORAGE_KEY);
      return stringified ? JSON.parse(stringified) : [];
    } else {
      return false;
    }
  }

}
