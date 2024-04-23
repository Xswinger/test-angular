import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { Vm } from './main-page-entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  vms: Vm[] = [];

  newVm!: FormGroup;

  private loadingState: boolean = true;

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
      RAM: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.getVms().then(() => {this.setLoadingState = false});
  }

  public getFormProperty(name: string): boolean | undefined {
    return this.newVm.get(name)?.invalid;
  }

  public async getVms() {
    this.api.getVms().subscribe(
      (data: any) => {
        this.vms = data['vms'];
      }
    )
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
