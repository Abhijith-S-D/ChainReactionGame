import { Injectable } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Injectable({
  providedIn: 'root'
})
export class CellSetupService {

  squarelength:number=12;

  cells: CellComponent[];

  constructor() { }

  setupLinks(cells: CellComponent[]){
    // cells[0].setColor('red');
    // cells[1].setColor('blue');
    // cells[0].next.push(cells[1]);
    // cells[1].next.push(cells[0]);
    // cells[0].subscribeNeighbours();
    // cells[1].subscribeNeighbours();
    for (let index = 0; index < cells.length; index++) {
      if((index-this.squarelength)>=0){
        cells[index].next.push(cells[index-this.squarelength]);
      }
      if((index-1)>=0 && index%this.squarelength!=0){
        cells[index].next.push(cells[index-1]);
      }
      if((index+1)<cells.length && (index+1)%this.squarelength!=0){
        cells[index].next.push(cells[index+1]);
      }
      if((index+this.squarelength)<cells.length){
        cells[index].next.push(cells[index+this.squarelength]);
      }
    }

    cells.forEach(cell => {
      cell.limit=cell.next.length-1;
      cell.subscribeNeighbours();
    });
    this.cells=cells;
  }
}
