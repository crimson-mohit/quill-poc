import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  fileUploadedEvent = new EventEmitter();

  constructor(private http: HttpClient) { }

  fileUploaded(params: any) {
    this.fileUploadedEvent.emit(params);
  }

  getFileById(userId: any, file_id: any): any {
    return this.http.get<any>(`https://channels.trinka.ai/trinka/api/v1/user/${userId}/file/${file_id}`);
  }
}
