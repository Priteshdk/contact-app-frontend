import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  DEFAULT_API_HOST = 'api_url';
  constructor(
    private http: HttpClient
  ) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, httpOptions = {}, host = this.DEFAULT_API_HOST): Observable<any> {
    return this.http.get(`${environment[host]}${path}`, httpOptions)
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}, httpOptions: object = {}, host = this.DEFAULT_API_HOST): Observable<any> {
    return this.http.put(
      `${environment[host]}${path}`,
      body, httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}, httpOptions: object = {}, host = this.DEFAULT_API_HOST): Observable<any> {
    console.log(body);
    return this.http.post(
      `${environment[host]}${path}`,
      body, httpOptions
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
