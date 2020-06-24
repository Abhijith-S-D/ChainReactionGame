import { Injectable, ViewContainerRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { ColorDataServiceService } from './color-data-service.service';
import { CellSetupService } from './cell-setup.service';
import { Subject } from 'rxjs';
import { GameComponent } from '../game/game.component';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  completed: boolean = false;

  gameOver: Subject<string> = new Subject<string>();

  playerColorSet: Set<string> = new Set<string>();

  createNewGame: Subject<number> = new Subject<number>();

  constructor(
    private colorDataService: ColorDataServiceService,
    private cellSetupService: CellSetupService
    ) { }

  analyzeState(){
    this.playerColorSet.clear();
    if(this.cellSetupService.cells){
      this.cellSetupService.cells.forEach(cell => {
        if(cell.color !== this.colorDataService.defaultColor){
          this.playerColorSet.add(cell.color);
        }
      });
    }
    if(this.playerColorSet.size==1 && this.colorDataService.index>=this.colorDataService.playerCount){
      this.completed = true;
      this.playerColorSet.forEach(color => {
        this.gameOver.next(color);
      });
    }
    return this.completed;
  }

  reset(){
    this.playerColorSet.clear();
    this.completed=false;
    if(this.cellSetupService.cells){
      this.cellSetupService.cells.forEach(cell => {
        cell.reset();
      });
    }
    this.colorDataService.index = 0;
  }

  setPlayerCount(count: number){
    if(count>0 || count<=this.colorDataService.colors.length)
    this.colorDataService.playerCount = count;
  }

  setSquareLength(length: number){
    this.cellSetupService.squarelength = length;
  }
  
}
