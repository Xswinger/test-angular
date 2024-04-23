import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vm } from '../page/main-page/main-page-entity';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly basePort = 8888;
    readonly baseUrl = `http://localhost:${this.basePort}/vms`;

    constructor(private http: HttpClient) {}

    //! Without this header all requests a failed with cosr error
    private getHeaders() {
        return new HttpHeaders({ 'Accept': '*/*' , 'Content-Type': 'text/plain'});
    }

    getVms(): Observable<any> {
        return this.http.get<Vm[]>(this.baseUrl);
    }

    getVm(id: Number): Observable<Vm> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<Vm>(this.baseUrl, { headers: this.getHeaders() });
    }

    createVm(vm: Vm): Observable<any> {
        const url = `${this.baseUrl}/create`;
        return this.http.post<any>(url, vm, { headers: this.getHeaders() });
    }

    removeVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/remove`;
        return this.http.post<any>(url, null, { headers: this.getHeaders() });
    }

    startVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/start`;
        return this.http.post<any>(url, null, { headers: this.getHeaders() });
    }

    stopVm(id: Number, force: Object): Observable<any> {
        const url = `${this.baseUrl}/${id}/stop`;
        return this.http.post<any>(url, force, { headers: this.getHeaders() });
    }

    pauseVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/pause`;
        return this.http.post<any>(url, null, { headers: this.getHeaders() });
    }

    resumeVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/resume`;
        return this.http.post<any>(url, null, { headers: this.getHeaders() });
    }

}