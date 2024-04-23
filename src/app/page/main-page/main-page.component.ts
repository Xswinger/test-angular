import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private loadingState: boolean = false;

  get getLoadingState() {
    return this.loadingState;
  }

  set setLoadingState(newState: boolean) {
    this.loadingState = newState;
  }

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  private getVms() {
    
  }

  private getVm() {

  }

  private createVm() {

  }

  private removeVm() {

  }

  private startVm() {

  }

  private stopVm() {

  }

  private pauseVm() {

  }

  private resumeVm() {

  }
}
