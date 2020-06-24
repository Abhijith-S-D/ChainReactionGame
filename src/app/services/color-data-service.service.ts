import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorDataServiceService {

  constructor() { }

  playerCount: number=2;

  defaultColor: string = 'Silver';

  colors: string[] = ['Maroon','Red','Orange','Yellow','Olive','Green','Purple','Fuchsia','Lime','Teal','Aqua','Blue'];

  index: number = 0;

  play(){
    this.index++;
  }
}
