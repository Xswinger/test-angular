import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Vm } from './main-page-entity';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  vms: Vm[] = [];

  newVm!: FormGroup;

  //TODO change loading message and status logic
  private loadingState: boolean = true;

  readonly loadingStateTitles: String[] = [
    'Загрузка', 'Ошибка, повторная попытка получения'
  ];

  loadingStateTitle: String = this.loadingStateTitles[0];

  get getLoadingState() {
    return this.loadingState;
  }

  set setLoadingState(newState: boolean) {
    this.loadingState = newState;
  }

  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.newVm = formBuilder.group({
      name: [null, [Validators.required]],
      vCPU: [null, [Validators.required]],
      RAM: [null, [Validators.min(1), Validators.max(64), Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getVms().then(() => {
      this.setLoadingState = false;
    }).catch(() => {
      this.loadingStateTitle = this.loadingStateTitles[1];
      setTimeout(() => this.ngOnInit(), 3000);
    });
  }

  public getFormProperty(name: string): AbstractControl<any, any> | null {
    return this.newVm.get(name);
  }

  public async getVms(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.api.getVms().subscribe(
        (data: any) => {
          this.vms = data['vms'];
          return resolve();
        }, error => {
          console.log(error);
          return reject();
        }
      )
    });
  }

  public getVm(id: Number) {
    this.api.getVm(id).subscribe(
      (data: any) => {
        console.log(data);
        this.vms = data['vms']
      }, error => {
        console.log(error);
      }
    );
  }

  public createVm() {
    this.api.createVm(this.newVm.value).subscribe(
      (data: any) => {
        console.log(data);
        this.getVms();
      }, error => {
        console.log(error);
      }
    );
  }

  public removeVm(id: Number) {
    this.api.removeVm(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getVms();
      }, error => {
        console.log(error);
      }
    );
  }

  public startVm(id: Number) {
    this.api.startVm(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getVm(id);
      }, error => {
        console.log(error);
      }
    );
  }

  public stopVm(id: Number, force: Object = {force: false}) {
    this.api.stopVm(id, force).subscribe(
      (data: any) => {
        console.log(data);
        this.getVm(id);
      }, error => {
        console.log(error);
      }
    );
  }

  public pauseVm(id: Number) {
    this.api.pauseVm(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getVm(id);
      }, error => {
        console.log(error);
      }
    );
  }

  public resumeVm(id: Number) {
    this.api.resumeVm(id).subscribe(
      (data: any) => {
        console.log(data);
        this.getVm(id);
      }, error => {
        console.log(error);
      }
    );
  }
}
