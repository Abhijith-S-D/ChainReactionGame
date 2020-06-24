import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../services/game-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  player: number = 2;
  board: number = 5;

  constructor( private gameStateService: GameStateService, private router: Router ) { }

  ngOnInit() {
  }

  onCreateGame(){
    this.router.navigate(['/game']);
    setTimeout(() => {
      this.gameStateService.setPlayerCount(this.player);
      this.gameStateService.setSquareLength(this.board);
      this.gameStateService.createNewGame.next(this.board);
    },1000);
  }

}
