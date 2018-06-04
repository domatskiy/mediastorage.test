import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, AbstractControl} from '@angular/forms';
import {HttpClient, HttpEventType, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { MediaStorage } from '../api/MediaStorage';

@Component({
  selector: 'send-file',
  templateUrl: './sendFile.component.html',
  styleUrls: ['./sendFile.component.scss']
})

export class SendFileComponent implements OnInit {
  constructor(private http: HttpClient) { }
  fileForm: FormGroup;
  file: File;
  processed: Boolean = false;
  percentDone: Number = 0;
  responseErrors = [];
  success = false;
  successEmail = false;

  ngOnInit() {
    this.fileForm = new FormGroup({
      email: new FormControl('', [this.emailValidator, Validators.maxLength(50)]),
      file: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(250)])
    });
  }

  private emailValidator(control: AbstractControl): ValidationErrors {
    if (!control.value) {
      return null;
    }
    return Validators.email(control);
  }

  /*private noFile(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      console.log(control)
      return null;
    }
  }*/

  handleFileSelect(event) {
    let target = event.target || event.srcElement;
    this.file = target.files.hasOwnProperty(0) ? target.files[0] : null;
    console.log('file.size', this.file.size)
    if (this.file && (this.file.size < 10000 * 1024 || this.file.size > 150000 * 1024)) {
      this.fileForm.get('file').setErrors({
        'incorrectSize': 'Размер файла должен быть не менее 100Мб и не более 150Мб'
      })
      console.log('file.size err');
    } else {

    }
  }

  onFormSubmit(): void {
    this.processed = true;
    const formData = new FormData();
    Object.keys(this.fileForm.controls).forEach(key => {
      if (key !== 'file' && this.fileForm.get(key).value) {
        if (key === 'email') {
          this.successEmail = true;
        }
        formData.append(key, this.fileForm.get(key).value);
      }
    })
    formData.append('file', this.file)
    this.responseErrors = [];
    const ms = new MediaStorage();
    this.http.request(ms.uploadFile(formData)).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.percentDone = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.processed = false;
        this.fileForm.reset();
        this.success = true;
      }
    }, error => {
      console.warn(error, 'status=', error.status, 'error=', error.error);
      this.processed = false;
      if (error.error !== undefined && error.error.errors !== undefined) {
        Object.keys(error.error.errors).forEach(key => {
          this.responseErrors.push(error.error.errors[key]);
        });
      } else if (error.error !== undefined && error.error.message !== undefined) {
        this.responseErrors.push(error.error.message);
      } else if (error.status === 0) {
        this.responseErrors.push('Данные не отправленны, проблема соединения с бэкендом');
      }
    });
  }
}
