import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class HttpBasicAuth {
  private authorizationToken: string;

  constructor(private http: Http) { }

  setAuthorizationToken(username, password) {
    this.authorizationToken = `Basic ${btoa(`${username}:${password}`)}`
  }

  private createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', this.authorizationToken);
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  getWithAuth(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.get(url,headers);
  }

  get(url, headers?) {
    return this.http.get(url, {
      headers: headers
    }).map(this.extractData);
  }

  postWithAuth(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.post(url, data, headers);
  }

  post(url, data, headers?) {
    return this.http.post(url, data, {
      headers: headers
    }).map(this.extractData);
  }

  options(url) {
    let headers = new Headers();
    return this.http.options(url, {
      headers: headers
    }).map(this.extractData);
  }
}