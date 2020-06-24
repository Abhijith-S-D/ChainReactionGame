import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameoverlayComponent } from './gameoverlay.component';

describe('GameoverlayComponent', () => {
  let component: GameoverlayComponent;
  let fixture: ComponentFixture<GameoverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameoverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameoverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
