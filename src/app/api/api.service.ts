import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    readonly basePort = 8888;
    readonly baseUrl = `localhost:${this.basePort}/vms`;

    constructor(private http: HttpClient) {}

    getVms(): Observable<any> {
        return this.http.get<any[]>(this.baseUrl);
    }

    getVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get<any>(this.baseUrl);
    }

    createVm(vm: any): Observable<any> {
        const url = `${this.baseUrl}/create`;
        return this.http.post<any>(url, vm);
    }

    removeVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/remove`;
        return this.http.post<any>(url, null);
    }

    startVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/start`;
        return this.http.post<any>(url, null);
    }

    stopVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/stop`;
        return this.http.post<any>(url, null);
    }

    pauseVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/pause`;
        return this.http.post<any>(url, null);
    }

    resumeVm(id: Number): Observable<any> {
        const url = `${this.baseUrl}/${id}/resume`;
        return this.http.post<any>(url, null);
    }

}