import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vm } from 'src/app/page/main-page/main-page-entity';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() data!: Vm;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onStart = new EventEmitter<number>();
  @Output() onStop = new EventEmitter<number>();
  @Output() onStopForce = new EventEmitter<number>();
  @Output() onPause = new EventEmitter<number>();
  @Output() onResume = new EventEmitter<number>();

  selectedAction!: any;

  public readonly states: Record<string, string> = {
    down: "Остановлен",
    up: "Запущен",
    powering_up: "Включен",
    powering_down: "Выключен",
    paused: "Приостановлен"
  }

  private isForce: boolean = false;

  get getForceState() {
    return this.isForce;
  }

  set setForceState(newState: boolean) {
    this.isForce = newState;
  }

  delete(id: number) {
      this.onDelete.emit(id);
  }

  start(id: number) {
      this.onStart.emit(id);
  }

  stop(id: number) {
    this.onStop.emit(id);
  }

  stopForce(id: number) {
    this.onStopForce.emit(id);
  }

  pause(id: number) {
    this.onPause.emit(id);
  }

  resume(id: number) {
    this.onResume.emit(id);
  }

  getVmState(vm: Vm): string {
    return this.states[vm.state];
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
