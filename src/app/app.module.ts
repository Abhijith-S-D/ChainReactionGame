import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { RangePipe } from './pipe/range.pipe';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { GameComponent } from './game/game.component';
import { StartComponent } from './start/start.component';
import { GameoverlayComponent } from './gameoverlay/gameoverlay.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from './services/router-strategy/router-strategy';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    RangePipe,
    AlertComponent,
    PlaceholderDirective,
    GameComponent,
    StartComponent,
    GameoverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent,GameComponent]
})
export class AppModule { }
