import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ColorDataServiceService } from '../services/color-data-service.service';
import { GameStateService } from '../services/game-state.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  value: number = 0;

  @Input()
  limit: number;

  @Input()
  color: string = this.colorService.defaultColor;

  @Input()
  next: CellComponent[] = [];

  clicked: Subject<string> = new Subject<string>();
  clickSubscription: Subscription[] = [];

  myStyles = {
    fontSize: '1em',
    backgroundColor: this.color,
    color: 'black'
  }

  constructor(private colorService: ColorDataServiceService, private gameStateService: GameStateService) { }

  ngOnInit() {
    this.myStyles.backgroundColor = this.color;
  }

  reset() {
    this.value = 0;
    this.setColor(this.colorService.defaultColor);
  }

  setColor(color: string) {
    this.color = color;
    this.myStyles.backgroundColor = color;
  }

  subscribeNeighbours() {
    this.next.forEach(
      neighbour => {
        let newSubscription = neighbour.clicked.subscribe(
          color => {
            if (this.value == this.limit) {
              this.reset();
              this.clicked.next(color);
            } else {
              this.setColor(color);
              this.value += 1;
            }
          }
        );
        this.clickSubscription.push(newSubscription);
      }
    );
  }

  @HostListener('click')
  cellClicked() {
    if (!this.gameStateService.analyzeState()) {
      if (this.colorService.colors[this.colorService.index % this.colorService.playerCount] === this.color) {
        if (this.value == this.limit) {
          let currentColor = this.color;
          this.reset();
          this.clicked.next(currentColor);
          this.colorService.play();
        } else {
          this.value += 1;
          this.colorService.play();
        }
      } else
        if (this.color === this.colorService.defaultColor) {
          this.setColor(this.colorService.colors[this.colorService.index % this.colorService.playerCount]);
          this.value += 1;
          this.colorService.play();
        }
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.clickSubscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
