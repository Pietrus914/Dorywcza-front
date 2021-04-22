import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  path = environment.apiUrl;
  isUploadedStatus?: boolean;

  constructor(private http: HttpClient) { }

  postFile(imageToUpload: File, userId: number): void {
    const formData: FormData = new FormData();
    formData.append('image', imageToUpload, imageToUpload.name);
    formData.append('avatar', 'true');
    formData.append('userId', String(userId));
    this.http.post<Blob>(`${this.path}/upload`, formData )
      .subscribe(

      );
  }

}
