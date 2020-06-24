import { Injectable, ComponentFactoryResolver, Renderer2, ViewContainerRef } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { Router } from '@angular/router';
import { GameStateService } from './game-state.service';

@Injectable({
  providedIn: 'root'
})
export class CreateGameService {

  public gameOverlayViewContainerRef: ViewContainerRef;
  public renderer2: Renderer2;

  constructor(
    private gameStateService: GameStateService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router
  ) { }

  public generateGameBoard(length: number, gameOverlayViewContainerRef: ViewContainerRef){
    const gameComponentFactory = this.componentFactoryResolver.resolveComponentFactory(GameComponent);
    gameOverlayViewContainerRef.clear();
    const componentRef = gameOverlayViewContainerRef.createComponent(gameComponentFactory);
    this.renderer2.addClass(componentRef.location.nativeElement, 'vertical-center');
    componentRef.instance.boardLength = length;
    this.gameOverlayViewContainerRef = gameOverlayViewContainerRef;
    this.gameStateService.reset();
    this.router.navigate(['/game']);
  }
}
