import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  currentEditor = this._socket.fromEvent<any>('editor');

  constructor(private _http: HttpClient, private _socket: Socket) { }

  getListOfDocumentsRequest() {
    return this._http.get(`${environment.apiURL}/documents`);
  }

  getDocumentByIdRequest(documentId: any) {
    return this._http.post(`${environment.apiURL}/documents/getById`, documentId);
  }

  uploadDocument(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this._http.post(`${environment.apiURL}/documents/upload`, formData)
  }

  updateDelta(id: string, delta: any) {
    this._socket.emit('document:write', { id, delta });
  }
}
