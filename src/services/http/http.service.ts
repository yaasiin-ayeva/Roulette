import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

const API_USERS_URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    constructor(private http: HttpClient) { }


    getRequest(url: string, option?: any): Observable<any> {
        return this.http
            .get(`${API_USERS_URL}${url}`, option)
            .pipe(catchError(this.handleError));
    }

    getServerRequest(url: string): Observable<any> {
        return this.http.get<any>(`${url}`).pipe(catchError(this.handleError));
    }

    postServerRequest(url: string, data: any, option?: any): Observable<any> {
        return this.http
            .post(`${url}`, data, option)
            .pipe(catchError(this.handleError));
    }

    postRequest(url: string, data: any, option?: any): Observable<any> {
        return this.http
            .post(`${API_USERS_URL}${url}`, data, option)
            .pipe(catchError(this.handleError));
    }

    updateRequest(url: string, data: any, option?: any): Observable<any> {
        return this.http
            .put(`${API_USERS_URL}${url}`, data, option)
            .pipe(catchError(this.handleError));
    }

    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend return code ${error.status},` +
                `body was: ${error.error}`
            );
        }

        return throwError(error.error);
    }
}
