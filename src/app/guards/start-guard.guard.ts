import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GameStateService } from '../services/game-state.service';

@Injectable({
  providedIn: 'root'
})
export class StartGuardGuard implements CanActivate {

  constructor(private gameStateService: GameStateService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.gameStateService.analyzeState();
      return this.gameStateService.completed || this.gameStateService.playerColorSet.size == 0;
  }
  
}
