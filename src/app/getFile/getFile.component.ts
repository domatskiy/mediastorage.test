import { Component, OnInit, OnDestroy} from '@angular/core';
import {MediaStorage} from '../api/MediaStorage';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
// 'rxjs/Rx

@Component({
  selector: 'get-file',
  templateUrl: './getFile.component.html',
  styleUrls: ['./getFile.component.scss']
})

export class GetFileComponent implements OnInit, OnDestroy {
  sub: any;
  processed: Boolean = false;
  percentDone: Number = 0;
  userHash: String = '';
  fileHash: String = '';
  error: String = '';
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
       console.log('params', params);
       this.userHash = params.user_hash;
       this.fileHash = params.file_hash;
    }, error => {});

    // this.downloadFile();
    window.location.href = 'http://back.mediastorage.test/api/uploaded/' + this.userHash + '/' + this.fileHash;

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  /*
  downloadFile(): void {
    const ms = new MediaStorage();
    this.http.request(ms.getFile(this.userHash, this.fileHash)).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event.type ===  HttpEventType.ResponseHeader) {
        console.info('status', event.status);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        const blob = new Blob([event.body]); // { type: 'text/csv' }
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        this.processed = false;
      }
    }, error => {
      console.warn('status=', error.status, 'error=', error.error);
      if (error.status === 404) {
        this.error = 'Файл не найден';
      }
    });
  }*/

}
