import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { GameoverlayComponent } from './gameoverlay/gameoverlay.component';
import { StartGuardGuard } from './guards/start-guard.guard';


const routes: Routes = [
  {
    path: 'start',
    component: StartComponent,
    canActivate: [ StartGuardGuard ]
  },
  {
    path: 'game',
    component: GameoverlayComponent,
    data: {
      reuse: true
    }
  },
  { 
    path: '', 
    redirectTo: 'start', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: 'start' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
