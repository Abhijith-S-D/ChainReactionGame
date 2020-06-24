import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CellSetupService } from '../services/cell-setup.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input()
  boardLength: number = 12;

  constructor(
    private cellSetupService: CellSetupService
    ) { }

  @ViewChildren(CellComponent) cells: QueryList<CellComponent>;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cellSetupService.squarelength=this.boardLength;
    this.cellSetupService.setupLinks(this.cells.toArray());
  }

}
