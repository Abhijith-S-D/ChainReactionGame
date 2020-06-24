import { 
  Component, 
  QueryList, 
  ViewChildren, 
  ComponentFactoryResolver, 
  ChangeDetectorRef,
  OnInit, 
  Renderer2} from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { GameStateService } from '../services/game-state.service';
import { AlertComponent } from '../alert/alert.component';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { Subscription } from 'rxjs';
import { CreateGameService } from '../services/create-game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gameoverlay',
  templateUrl: './gameoverlay.component.html',
  styleUrls: ['./gameoverlay.component.scss']
})
export class GameoverlayComponent implements OnInit {
  gameOverSubscription: Subscription;
  closeSubscription: Subscription;
  createGameSubscription: Subscription;

  @ViewChildren(PlaceholderDirective)
  allHosts: QueryList<PlaceholderDirective>;


  @ViewChildren(CellComponent) 
  cells: QueryList<CellComponent>;

  constructor( 
    private cd: ChangeDetectorRef,
    private gameStateService: GameStateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private createGameService: CreateGameService,
    private renderer2: Renderer2,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.gameOverSubscription = this.gameStateService.gameOver.subscribe(color => {
      this.showWinnerAlert(color);
    });

    this.createGameSubscription = this.gameStateService.createNewGame.subscribe((boardLength) => {
      this.createGameService.renderer2 = this.renderer2;
      this.createGameService.generateGameBoard(boardLength,this.allHosts.toArray()[1].viewContainerRef);
      this.allHosts.toArray()[0].viewContainerRef.clear();
    });

  }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    //console.log(this.allHosts.toArray()[0].viewContainerRef);
    //console.log(this.allHosts.toArray()[1].viewContainerRef);
    // this.createGameService.renderer2 = this.renderer2;
    // this.createGameService.generateGameBoard(5,this.allHosts.toArray()[1].viewContainerRef);
    // this.cd.detectChanges();
    
  }


  private showWinnerAlert(winner: string){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.allHosts.toArray()[0].viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.winner = winner;
    componentRef.instance.winnerColor = winner;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
      //this.gameStateService.reset();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.gameOverSubscription){
      this.gameOverSubscription.unsubscribe();
    }
    if(this.closeSubscription){
      this.closeSubscription.unsubscribe();
    }
    if(this.createGameSubscription){
      this.createGameSubscription.unsubscribe();
    }
  }
}
