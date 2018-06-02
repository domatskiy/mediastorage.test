import { Injectable } from '@angular/core';
import {HttpRequest, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MediaStorage {
  uploadFile(data: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    // 'application/x-www-form-urlencoded;charset=utf-8'
    headers.set('Accept', 'application/json');

    return new HttpRequest('POST', '/upload', data, {
        headers: headers,
        reportProgress: true,
    });
  }
  getFile(user: String, file: String) {
    const headers = new HttpHeaders();
    return new HttpRequest('GET', '/uploaded/' + user + '/' + file, {});
  }
}
