import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input()
  winner: string;

  @Input()
  winnerColor: string = 'Yellow'; 

  @Output()
  close: EventEmitter<void> = new EventEmitter<void>(); 

  constructor() { }

  ngOnInit() {
  }
  @HostListener('click')
  onClose(){
    this.close.emit();
  }

}
